#!/bin/bash

# Security Verification Script
# Run this before committing to ensure no sensitive data is exposed

echo "🔍 Verifying security configuration..."
echo ""

# Check if .gitignore exists
if [ ! -f .gitignore ]; then
    echo "❌ .gitignore not found!"
    exit 1
fi
echo "✅ .gitignore exists"

# Check if .env is ignored
if git check-ignore -q .env 2>/dev/null; then
    echo "✅ .env is properly ignored"
else
    echo "⚠️  Warning: .env might not be ignored"
fi

# Check if node_modules is ignored
if git check-ignore -q node_modules 2>/dev/null; then
    echo "✅ node_modules is properly ignored"
else
    echo "⚠️  Warning: node_modules might not be ignored"
fi

# Check if .next is ignored
if git check-ignore -q .next 2>/dev/null; then
    echo "✅ .next is properly ignored"
else
    echo "⚠️  Warning: .next might not be ignored"
fi

# Search for potential secrets in staged files
echo ""
echo "🔍 Checking for potential secrets in staged files..."

# Check for DATABASE_URL with actual credentials (not example)
if git diff --cached --name-only | xargs grep -l "postgres://.*@.*:" 2>/dev/null | grep -v ".env.example"; then
    echo "⚠️  Warning: Found potential database URL in staged files!"
    git diff --cached | grep "postgres://"
else
    echo "✅ No database URLs found in staged files"
fi

# Check for common secret patterns
if git diff --cached | grep -iE "(password|secret|api_key|private_key|token).*=.*['\"].*['\"]" | grep -v ".env.example" | grep -v "placeholder" | grep -v "your_"; then
    echo "⚠️  Warning: Found potential secrets in staged files!"
else
    echo "✅ No obvious secrets found in staged files"
fi

# Verify .env.example has no real credentials
echo ""
echo "🔍 Verifying .env.example has no real credentials..."
if [ -f .env.example ]; then
    if grep -iE "(localhost|username|password|your_|placeholder)" .env.example > /dev/null; then
        echo "✅ .env.example appears to have placeholder values"
    else
        echo "⚠️  Warning: .env.example might contain real credentials"
        echo "Contents:"
        cat .env.example
    fi
fi

echo ""
echo "🎯 Security verification complete!"
echo ""
echo "Safe to commit: $(git status --short | wc -l) files"
echo ""
echo "To commit these files:"
echo "  git add ."
echo "  git commit -m 'Initial commit'"
echo ""
