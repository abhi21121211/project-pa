#!/bin/bash

# ============================================================
# Project PA CLI Test Script
# Tests the CLI with a sample React Todo App
# ============================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# API Keys - set these in your shell before running this script, e.g.:
#   export GEMINI_KEY="your-gemini-api-key"
#   export OPENROUTER_KEY="your-openrouter-api-key"
GEMINI_KEY="${GEMINI_KEY:?Set GEMINI_KEY in your environment before running this script}"
OPENROUTER_KEY="${OPENROUTER_KEY:-}"

# Test directory
TEST_DIR="/Users/abhi/Developer/My Project/Project PA/test-app"

echo -e "${BLUE}"
echo "============================================================"
echo "  Project PA CLI Test Script"
echo "  Testing with React Todo App"
echo "============================================================"
echo -e "${NC}"

# Navigate to test app
cd "$TEST_DIR"
echo -e "${YELLOW}📁 Working directory: $(pwd)${NC}"
echo ""

# Check if CLI is installed
echo -e "${BLUE}1. Checking CLI installation...${NC}"
if command -v pa &> /dev/null; then
    PA_VERSION=$(pa --version 2>/dev/null || echo "unknown")
    echo -e "${GREEN}   ✓ CLI installed: pa v${PA_VERSION}${NC}"
else
    echo -e "${RED}   ✗ CLI not found. Installing...${NC}"
    npm install -g @abhi21121211/project-pa-cli@latest
fi
echo ""

# Clean up previous test files
echo -e "${BLUE}2. Cleaning up previous test files...${NC}"
rm -f presentation.json .pa-config.json
echo -e "${GREEN}   ✓ Cleaned up${NC}"
echo ""

# ============================================================
# TEST 1: Generate with Gemini
# ============================================================
echo -e "${BLUE}3. TEST: Generate with Gemini API${NC}"
echo -e "${YELLOW}   Running: pa generate --api-key \$GEMINI_KEY${NC}"
echo ""

# Run the generate command (will need interactive input for model selection)
echo -e "${YELLOW}   This test requires interactive input. Please follow the prompts:${NC}"
echo -e "${YELLOW}   - Select model: Gemini 2.0 Flash${NC}"
echo -e "${YELLOW}   - Protected routes: Yes${NC}"
echo -e "${YELLOW}   - Provide token: No${NC}"
echo ""

pa generate --api-key "$GEMINI_KEY"

# Check result
if [ -f "presentation.json" ]; then
    echo ""
    echo -e "${GREEN}   ✓ presentation.json generated successfully!${NC}"
    STEPS=$(grep -c '"id"' presentation.json 2>/dev/null || echo "0")
    echo -e "${GREEN}   ✓ Steps found: $STEPS${NC}"
    
    # Show first few lines
    echo -e "${BLUE}   Preview:${NC}"
    head -20 presentation.json
    echo "   ..."
else
    echo -e "${RED}   ✗ Failed to generate presentation.json${NC}"
fi
echo ""

# ============================================================
# TEST 2: Deploy
# ============================================================
echo -e "${BLUE}4. TEST: Deploy to cloud${NC}"
if [ -f "presentation.json" ]; then
    pa deploy
    
    if [ -f ".pa-config.json" ]; then
        echo ""
        echo -e "${GREEN}   ✓ .pa-config.json created!${NC}"
        echo -e "${BLUE}   Config content:${NC}"
        cat .pa-config.json
    fi
else
    echo -e "${RED}   ✗ Skipping deploy - no presentation.json${NC}"
fi
echo ""

# ============================================================
# TEST 3: Generate with OpenRouter (optional)
# ============================================================
echo -e "${BLUE}5. TEST: Generate with OpenRouter API (optional)${NC}"
echo -e "${YELLOW}   Do you want to test OpenRouter? (y/n)${NC}"
read -r TEST_OPENROUTER

if [ "$TEST_OPENROUTER" = "y" ]; then
    # Backup Gemini result
    mv presentation.json presentation-gemini.json 2>/dev/null
    
    echo -e "${YELLOW}   Running: pa generate --api-key \$OPENROUTER_KEY${NC}"
    echo -e "${YELLOW}   - Select tier: Free${NC}"
    echo -e "${YELLOW}   - Select model: Llama 3.3 or Mistral 7B${NC}"
    echo ""
    
    pa generate --api-key "$OPENROUTER_KEY"
    
    if [ -f "presentation.json" ]; then
        echo -e "${GREEN}   ✓ OpenRouter generation successful!${NC}"
        mv presentation.json presentation-openrouter.json
        mv presentation-gemini.json presentation.json
    fi
fi
echo ""

# ============================================================
# Summary
# ============================================================
echo -e "${BLUE}"
echo "============================================================"
echo "  Test Summary"
echo "============================================================"
echo -e "${NC}"

echo -e "Files created:"
ls -la *.json .pa-config.json 2>/dev/null || echo "  No files found"
echo ""

if [ -f "presentation.json" ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Open index.html in browser"
    echo "2. Add the runtime script from deployment output"
    echo "3. Test the presentation tour"
else
    echo -e "${RED}❌ Some tests failed${NC}"
fi

echo ""
echo -e "${BLUE}============================================================${NC}"
