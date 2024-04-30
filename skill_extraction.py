from transformers import pipeline

# Load the pipeline for skill extraction
skill_extraction_pipeline = pipeline("token-classification", model="jjzha/jobbert_skill_extraction")

# Input text
input_text = "My name is Clara and I live in Berkeley, California."

# Extract skills
output = skill_extraction_pipeline(input_text)

# Print extracted skills
print("Extracted skills:", output)
