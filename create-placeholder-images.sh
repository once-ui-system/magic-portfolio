#!/bin/bash

# Create directory if it doesn't exist
mkdir -p public/images/projects/ai-chatbots

# Create first placeholder image - cover image
convert -size 1200x630 gradient:'#4527A0-#7B1FA2' \
  -font Arial -pointsize 40 -fill white \
  -gravity center -annotate 0 "AI Chatbots\nCover Image" \
  -draw "fill none stroke white stroke-width 5 roundrectangle 50,50 1150,580" \
  public/images/projects/ai-chatbots/cover-01.jpg

# Create second placeholder image - dashboard
convert -size 1200x800 gradient:'#3949AB-#1A237E' \
  -font Arial -pointsize 40 -fill white \
  -gravity center -annotate 0 "AI Chatbots\nDashboard" \
  -draw "fill none stroke white stroke-width 5 roundrectangle 100,100 1100,700" \
  -draw "fill none stroke white stroke-width 2 roundrectangle 150,200 500,650" \
  -draw "fill none stroke white stroke-width 2 roundrectangle 550,200 1050,650" \
  public/images/projects/ai-chatbots/dashboard-01.jpg

echo "Placeholder images created successfully."

