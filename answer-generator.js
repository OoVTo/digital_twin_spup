/**
 * Interview Answer Generator Module
 * Generates interview answers based on resume context and job details
 */

const fetch = global.fetch || require('node-fetch');

async function generateInterviewAnswer(question, jobTitle, jobSkills, resumeContext, apiKeys) {
  const { GROQ_API_KEY, OPENAI_API_KEY } = apiKeys;

  const prompt = `You are a job candidate in an interview. Based ONLY on the provided resume context, provide a realistic and professional answer (2-3 sentences) to this interview question.

Target Position: ${jobTitle}
Required Skills: ${(jobSkills || []).join(", ") || "Not specified"}

Resume Context:
${resumeContext || "Limited resume information available"}

Interview Question:
${question}

Provide a concise, professional answer in first person. Be specific and relevant to the question and position. Do NOT make up experience not in the resume.`;

  let answerText = null;

  // Try GROQ first (faster)
  if (GROQ_API_KEY && !answerText) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 250,
          temperature: 0.6
        })
      });

      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        answerText = data.choices?.[0]?.message?.content?.trim();
      }
    } catch (err) {
      console.error("GROQ answer generation error:", err.message);
    }
  }

  // Fallback to OpenAI
  if (!answerText && OPENAI_API_KEY) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 250,
          temperature: 0.6
        })
      });

      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        answerText = data.choices?.[0]?.message?.content?.trim();
      }
    } catch (err) {
      console.error("OpenAI answer generation error:", err.message);
    }
  }

  // Return answer or fallback
  return (
    answerText ||
    `Based on my experience with ${(jobSkills || ["the required technologies"])[0]}, I can effectively contribute to this role and team.`
  );
}

module.exports = { generateInterviewAnswer };
