const emailPrompt = ({
  name, githubUrl, linkedinUrl, mobileNumber, emailId, jobRole, companyName,
  category, experience, jobDescription, tone, length, skills
}) => {
  let categoryInstructions = '';
  switch (category.toLowerCase()) {
    case 'internship':
    case 'job':
      categoryInstructions = `
        Generate a professional application email for a ${category} opportunity.
        - Include an introduction expressing enthusiasm for the ${jobRole} ${category} at ${companyName}.
        - Mention relevant experience (${experience} years) and how it aligns with the job description (if provided).
        - Include a "Skills" section with skills listed inline, comma-separated (e.g., "HTML, CSS, JavaScript"), prefixed with "**Skills:**" in bold.
        - Include a "Links" section with GitHub and LinkedIn URLs in a bullet-point list (if provided), prefixed with "**Links:**" in bold.
        - Include a "Contact" section with email and mobile (if provided), prefixed with "**Contact:**" in bold.
        - Conclude with a statement about attaching a resume and gratitude for consideration.
      `;
      break;
    case 'thank you':
      categoryInstructions = `
        Generate a professional thank-you email following an interview or interaction.
        - Express gratitude for the opportunity to discuss the ${jobRole} position at ${companyName}.
        - Briefly reiterate interest in the role and highlight a key point from the interaction (if job description provided, reference it subtly).
        - Include a "Skills" section with skills listed inline, comma-separated (e.g., "HTML, CSS, JavaScript"), prefixed with "**Skills:**" in bold, if relevant.
        - Include a "Contact" section with email and mobile (if provided), prefixed with "**Contact:**" in bold.
        - Conclude with appreciation and eagerness to hear back.
      `;
      break;
    case 'followup':
      categoryInstructions = `
        Generate a professional follow-up email after applying or interviewing for the ${jobRole} position at ${companyName}.
        - Politely inquire about the status of the application or interview process.
        - Reaffirm interest in the role and briefly mention how your skills align (reference job description if provided).
        - Include a "Skills" section with skills listed inline, comma-separated (e.g., "HTML, CSS, JavaScript"), prefixed with "**Skills:**" in bold, if relevant.
        - Include a "Contact" section with email and mobile (if provided), prefixed with "**Contact:**" in bold.
        - Conclude with gratitude and a professional closing.
      `;
      break;
    case 'referral':
      categoryInstructions = `
        Generate a professional email requesting a referral for the ${jobRole} position at ${companyName}.
        - Address the recipient (e.g., a colleague or contact) and explain the purpose of requesting a referral.
        - Highlight your qualifications and interest in the role, referencing the job description if provided.
        - Include a "Skills" section with skills listed inline, comma-separated (e.g., "HTML, CSS, JavaScript"), prefixed with "**Skills:**" in bold.
        - Include a "Links" section with GitHub and LinkedIn URLs in a bullet-point list (if provided), prefixed with "**Links:**" in bold.
        - Include a "Contact" section with email and mobile (if provided), prefixed with "**Contact:**" in bold.
        - Conclude with gratitude for their support and willingness to provide further information.
      `;
      break;
    default:
      categoryInstructions = `
        Generate a generic professional email for the ${jobRole} position at ${companyName}.
        - Include an introduction expressing interest in the role or opportunity.
        - Mention relevant experience (${experience} years) and skills.
        - Include a "Skills" section with skills listed inline, comma-separated (e.g., "HTML, CSS, JavaScript"), prefixed with "**Skills:**" in bold.
        - Include a "Links" section with GitHub and LinkedIn URLs in a bullet-point list (if provided), prefixed with "**Links:**" in bold.
        - Include a "Contact" section with email and mobile (if provided), prefixed with "**Contact:**" in bold.
        - Conclude with gratitude and a professional closing.
      `;
  }

  return `
    You MUST return a JSON object with "subject" and "email" fields containing the email content as strings. Do NOT wrap the response in code fences (e.g., \`\`\`json). Example:
    {
      "subject": "Application for Software Engineer Position",
      "email": "**Dear Hiring Manager,**\\n\\nI am excited to apply for the Software Engineer position at Google...\\n\\n**Best regards,**\\nJohn Doe"
    }
    Details:
    - Name: ${name}
    - Email: ${emailId}
    - Job Role: ${jobRole}
    - Company: ${companyName}
    - Category: ${category}
    - Experience: ${experience} years
    - Tone: ${tone} (e.g., formal, semi-formal, informal)
    - Length: ${length} (e.g., short (~100 words), medium (~200 words), long (~300 words))
    - Skills: ${skills || 'Not provided'}
    - GitHub: ${githubUrl || 'Not provided'}
    - LinkedIn: ${linkedinUrl || 'Not provided'}
    - Mobile: ${mobileNumber || 'Not provided'}
    - Job Description: ${jobDescription || 'Not provided'}

    ${categoryInstructions}
    - Use a professional subject line tailored to the category (e.g., "Thank You for the ${jobRole} Interview at ${companyName}" for thank you emails).
    - Start with a greeting (e.g., "**Dear Hiring Manager,**" or "**Dear [Recipient],**" for referral emails) in bold.
    - Ensure the email matches the specified tone and length.
    - Only bold the section headings (Skills, Links, Contact, where applicable) and greeting/closing using **.
    - Use \\n for line breaks.
    - Do not include placeholders like [Platform].
    - Ensure no extra stars or escaping in the output.
  `;
};

module.exports = emailPrompt;