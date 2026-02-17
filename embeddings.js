/**
 * Embeddings Pipeline for Digital Twin Resume
 * 
 * This script:
 * 1. Extracts text from resume data into structured sections
 * 2. Upserts sections to Upstash Vector Database (embedding handled by Upstash BM25 model)
 * 3. Enables semantic search via /api/search endpoint
 */

require('dotenv').config();
const { Index } = require('@upstash/vector');

// Initialize Upstash Vector client
const upstashVectorUrl = process.env.UPSTASH_VECTOR_REST_URL;
const upstashVectorToken = process.env.UPSTASH_VECTOR_REST_TOKEN;

if (!upstashVectorUrl || !upstashVectorToken) {
  console.error('❌ Error: UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN must be set in .env');
  process.exit(1);
}

const index = new Index({
  url: upstashVectorUrl,
  token: upstashVectorToken,
});

// Import resume data from data.js to keep in sync
const { resumeData } = require('./data.js');

/**
 * Extract all text fields and create document chunks
 */
function extractResumeSections() {
  const sections = [];

  // Personal data
  Object.entries(resumeData.personal).forEach(([key, value]) => {
    if (value) {
      sections.push({
        id: `personal_${key}`,
        data: `Personal: ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} is ${value}`,
        metadata: { category: 'personal', field: key }
      });
    }
  });

  // Education
  Object.entries(resumeData.education).forEach(([key, value]) => {
    if (value) {
      sections.push({
        id: `education_${key}`,
        data: `Education: ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} - ${value}`,
        metadata: { category: 'education', field: key }
      });
    }
  });

  // Certifications with detailed descriptions
  resumeData.certifications.forEach((cert, index) => {
    const isObject = typeof cert === 'object' && cert.title;
    const title = isObject ? cert.title : cert;
    const desc = isObject ? cert.desc : '';
    
    sections.push({
      id: `cert_${index}`,
      data: `Certification: ${title}${desc ? '. ' + desc : ''}`,
      metadata: { category: 'certifications', index, title, org: isObject ? cert.org : '' }
    });
  });

  // Events with detailed descriptions
  resumeData.events.forEach((event, index) => {
    const eventData = `Event: ${event.title} at ${event.venue} on ${event.date}${event.desc ? '. ' + event.desc : ''}`;
    
    sections.push({
      id: `event_${index}`,
      data: eventData,
      metadata: { category: 'events', index, title: event.title }
    });
  });

  // Affiliations with detailed role descriptions
  resumeData.affiliations.forEach((affiliation, index) => {
    const isObject = typeof affiliation === 'object' && affiliation.role;
    const roleInfo = isObject ? `${affiliation.role} at ${affiliation.organization} (${affiliation.period})` : affiliation;
    const desc = isObject ? affiliation.desc : '';
    
    sections.push({
      id: `affiliation_${index}`,
      data: `Affiliation: ${roleInfo}${desc ? '. ' + desc : ''}`,
      metadata: { category: 'affiliations', index }
    });
  });

  // Skills with detailed information
  if (resumeData.skills) {
    Object.entries(resumeData.skills).forEach(([category, skillList]) => {
      const categoryName = category.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
      
      if (Array.isArray(skillList)) {
        // Create category-level summary
        let categorySummary = [];
        let detailedSkillsText = [];
        
        skillList.forEach((skill, index) => {
          let skillName = '';
          let skillDetails = '';
          
          // Handle both object and string formats
          if (typeof skill === 'object') {
            skillName = skill.area || skill.lang || skill.name || skill.tool || skill.system || skill.practice || skill.skill || '';
            // Combine all available detail fields
            skillDetails = [skill.level, skill.proficiency, skill.details, skill.useCases, skill.examples, skill.expertise, skill.usage, skill.description, skill.category]
              .filter(d => d)
              .join('; ');
          } else {
            skillName = skill;
          }
          
          categorySummary.push(skillName);
          
          // Add detailed entry for each skill
          sections.push({
            id: `skill_${category}_${index}`,
            data: `Skill: ${skillName}${skillDetails ? ' (' + skillDetails + ')' : ''} in ${categoryName}`,
            metadata: { 
              category: 'skills', 
              subcategory: categoryName, 
              skill: skillName,
              details: skillDetails
            }
          });
        });
        
        // Add category summary
        sections.push({
          id: `skills_${category}`,
          data: `Skills - ${categoryName}: ${categorySummary.join(', ')}`,
          metadata: { category: 'skills', subcategory: categoryName }
        });
      }
    });
  }

  return sections;
}

/**
 * Main function to upsert all sections using Upstash-native embedding
 */
async function upsertAllSections() {
  console.log('📊 Extracting resume sections...');
  const sections = extractResumeSections();
  console.log(`✅ Extracted ${sections.length} sections\n`);

  console.log('🔄 Upserting sections to Upstash Vector Database...\n');

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    try {
      console.log(`[${i + 1}/${sections.length}] ${section.id}`);
      
      // Upsert to Upstash - Upstash handles embedding via BM25 model
      await index.upsert({
        id: section.id,
        data: section.data,
        metadata: {
          ...section.metadata,
          text: section.data  // Store the actual text in metadata for retrieval
        }
      });
      
      successCount++;
      console.log(`  ✅ Upserted to Upstash`);
    } catch (error) {
      errorCount++;
      console.error(`  ❌ Error: ${error.message}`);
    }
    
    // Small delay between uploads
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log(`\n📈 Results:`);
  console.log(`  ✅ Successfully upserted: ${successCount} vectors`);
  console.log(`  ❌ Failed: ${errorCount} vectors`);
  console.log(`  📊 Total: ${sections.length} sections processed`);
}

// Run the pipeline
if (require.main === module) {
  upsertAllSections()
    .then(() => {
      console.log('\n✨ Embedding pipeline completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    });
}

module.exports = { extractResumeSections, upsertAllSections };
