export const consultationData = {
  title: "Free Consultation",
  personalInfo: {
    sectionTitle: "Personal Information",
    fields: {
      firstName: { label: "First Name", placeholder: "Enter your first name" },
      lastName: { label: "Last Name", placeholder: "Enter your last name" },
      email: {
        label: "Email Address",
        placeholder: "Enter your email address",
      },
      phone: { label: "Phone Number", placeholder: "Enter your phone number" },
      company: {
        label: "Company / Organization",
        placeholder: "Enter company or organization name",
      },
    },
  },
  interests: {
    sectionTitle: "I'm Interested In",
    options: [
      { id: "corporate", label: "Corporate Law & Compliance" },
      { id: "litigation", label: "Civil & Criminal Litigation" },
      { id: "intellectual", label: "Intellectual Property" },
      { id: "real-estate", label: "Real Estate & Property" },
      { id: "family", label: "Family & Matrimonial Law" },
    ],
  },
  message: {
    sectionTitle: "Your Message",
    placeholder: "Write your message here...",
  },
  submitButton: "Send Message",
}
