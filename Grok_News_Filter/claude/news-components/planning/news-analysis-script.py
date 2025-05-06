#!/usr/bin/env python3
"""
News Analysis Generator
Uses the Anthropic API to analyze current news and generate structured JSON
For use with automated GitHub Actions workflow
"""

import os
import json
import time
from datetime import datetime
import requests
from dotenv import load_dotenv
import anthropic

# Load environment variables
load_dotenv()

# Get API key from environment variables
api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY environment variable not set!")

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=api_key)

# The prompt template
ANALYSIS_PROMPT = """
You are an expert news analyst with extensive experience in identifying propaganda techniques, media bias, and information gaps. Your task is to analyze recent news stories and generate a structured JSON file containing your analysis.

## Analysis Format

The analysis should be structured in JSON format with these main components:
- "stories": Array of 4-6 story objects
- Each story object contains: id, title, icon, summary, and analysis sections
- "meta": Contains analysisDate and sources

## Analysis Guidelines

- Focus on 4-6 significant stories from the past 48 hours
- Prioritize stories with global or national significance
- Include a mix of political, economic, social, and technological stories
- Assign each story a unique ID (lowercase, hyphenated)
- Frame titles as engaging questions (e.g., "Will peace talks resume after the ceasefire?")
- Choose appropriate icons: "Globe", "Vote", "DollarSign", "AlertTriangle", "Smartphone", "Users", "Briefcase", "Shield"
- For each analysis section, include:
  * "truth": List 2-5 verified facts central to the story
  * "falsehoods" (if any): Identify specific false or misleading claims
  * "gaps": Note 2-3 important questions not addressed in mainstream coverage
  * "negativeEvidence": Identify expected elements that are notably absent
  * "propaganda": Identify specific propaganda techniques used (if any)

## Response Requirements

You must provide the complete JSON data for all stories. The JSON must be properly formatted, valid, and complete. Do not include any explanation, just return the JSON structure.

Your analysis should be balanced, factual, and provide proper metadata including sources.
"""

# Function to get top news stories
def fetch_current_headlines():
    """Gets the latest headlines to add to the prompt context"""
    try:
        # You could replace this with a call to a news API like NewsAPI.org
        # For simplicity, we're just returning a note to look at current events
        return "Analyze current significant world news as of " + datetime.now().strftime("%B %d, %Y")
    except Exception as e:
        print(f"Error fetching headlines: {e}")
        return "Analyze the most significant current world events for today"

# Function to generate analysis
def generate_analysis():
    """Generate news analysis JSON using Anthropic API"""
    print("Generating news analysis...")
    
    # Build complete prompt with latest headlines context
    headlines_context = fetch_current_headlines()
    complete_prompt = f"{ANALYSIS_PROMPT}\n\n{headlines_context}"
    
    # Call Anthropic API
    try:
        response = client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=4000,
            temperature=0.3,
            system="You are an expert news analyst that provides factual, balanced analysis in valid JSON format.",
            messages=[
                {"role": "user", "content": complete_prompt}
            ]
        )
        
        # Extract JSON from response
        response_text = response.content[0].text
        
        # Sometimes the API returns the JSON with explanatory text around it
        # Let's try to extract just the JSON part
        try:
            # Look for JSON wrapped in code blocks
            if "```json" in response_text:
                json_start = response_text.find("```json") + 7
                json_end = response_text.rfind("```")
                json_text = response_text[json_start:json_end].strip()
            else:
                # If no code blocks, assume the entire response is JSON
                json_text = response_text
            
            # Parse the JSON to validate it
            analysis_data = json.loads(json_text)
            
            # Write to output file
            with open("analysis-output.json", "w", encoding="utf-8") as f:
                json.dump(analysis_data, f, indent=2, ensure_ascii=False)
            
            print(f"Analysis saved to analysis-output.json")
            return True
            
        except json.JSONDecodeError as e:
            print(f"Failed to parse JSON from API response: {e}")
            print(f"Response was: {response_text[:500]}...")
            return False
            
    except Exception as e:
        print(f"Error calling Anthropic API: {e}")
        return False

# Main execution
if __name__ == "__main__":
    success = generate_analysis()
    
    if not success:
        print("Failed to generate analysis")
        exit(1)
    
    print("News analysis generation complete")
    exit(0)
