# HeyTasky - Refactor Tasks

## 🚨 CRITICAL - Security Issue

**API Key Exposed in Code:**
- File: `/src/lib/components/CreateItem.svelte` line 9
- Gemini API key is hardcoded: `AIzaSyBA3NI1Mh5Q2RJfGL6CTt1F9jQcFDo0Yh0`
- This key is visible in Git history and on GitHub
- **Action required:** Revoke this key immediately in Google Cloud Console

---

## Required Changes

### 1. Switch from Gemini to OpenAI API

**Why:**
- Resume and project documentation state "OpenAI API"
- Currently using Google Generative AI (Gemini)
- Need consistency across all materials

**Files to modify:**
- `src/lib/components/CreateItem.svelte`

**Changes needed:**
```typescript
// REMOVE:
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAi = new GoogleGenerativeAI('EXPOSED_API_KEY');
const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });

// REPLACE WITH:
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Client-side usage
});
```

**Update processAiTaskInput function:**
```typescript
async function processAiTaskInput() {
  if (!prompt.trim()) return;

  isLoading = true;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a productivity assistant. Convert user input into clear, actionable to-do items. Only return the task text—no explanations or formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const aiResponse = completion.choices[0].message.content.trim();
    onSubmit(aiResponse);
    prompt = '';
  } catch (error) {
    console.error('Error generating content:', error);
  } finally {
    isLoading = false;
  }
}
```

---

### 2. Environment Variable Setup

**Create `.env` file in project root:**
```
VITE_OPENAI_API_KEY=sk-your-actual-key-here
```

**Create `.env.example` for documentation:**
```
VITE_OPENAI_API_KEY=sk-your-key-here
```

**Verify `.gitignore` includes:**
```
.env
.env.*
!.env.example
```

---

### 3. Update Dependencies

**Remove Gemini package:**
```bash
npm uninstall @google/generative-ai
```

**Install OpenAI SDK:**
```bash
npm install openai
```

---

### 4. Update README.md

Once code changes are complete, copy the README from:
`/Users/fraserbrown/Documents/Programming/job-hunt/project-readmes/hey-tasky-README.md`

To:
`/Users/fraserbrown/Documents/Programming/Kangan/Web_Dev/Repos/Ai_to_do/README.md`

---

### 5. Git Cleanup (Optional but Recommended)

**Problem:** The exposed API key exists in Git history

**Options:**

**Option A - Easy but incomplete:**
- Just revoke the old key
- Commit the fixes with new env variable approach
- Old key is useless but still visible in history

**Option B - Proper cleanup (requires force push):**
- Use git-filter-repo or BFG Repo-Cleaner to remove key from history
- Force push to GitHub (rewrites history)
- **WARNING:** This is destructive if others have cloned the repo

**Recommendation for portfolio repo:** Option A is fine. Just revoke the key and fix going forward.

---

## Testing Checklist

After making changes, verify:

- [ ] Gemini package removed from `package.json`
- [ ] OpenAI SDK installed and imported
- [ ] `.env` file created with `VITE_OPENAI_API_KEY`
- [ ] `.env.example` created for documentation
- [ ] `.gitignore` includes `.env`
- [ ] API key accessed via `import.meta.env.VITE_OPENAI_API_KEY`
- [ ] App runs: `npm run dev`
- [ ] Task creation works with OpenAI API
- [ ] No API keys visible in code
- [ ] Old Gemini API key revoked in Google Cloud Console
- [ ] README.md updated with new content
- [ ] Changes committed and pushed to GitHub

---

## Estimated Time

- Revoke Gemini key: 2 minutes
- Code changes: 10 minutes
- Dependency updates: 2 minutes
- Environment setup: 3 minutes
- Testing: 5 minutes
- README update: 2 minutes

**Total: ~25 minutes**

---

## Commands Summary

```bash
# 1. Install OpenAI
npm install openai

# 2. Remove Gemini
npm uninstall @google/generative-ai

# 3. Create .env file
echo "VITE_OPENAI_API_KEY=sk-your-key-here" > .env

# 4. Create .env.example
echo "VITE_OPENAI_API_KEY=sk-your-key-here" > .env.example

# 5. Test the app
npm run dev

# 6. Commit changes
git add .
git commit -m "refactor: switch from Gemini to OpenAI API with environment variables"
git push
```

---

## Notes for Next Session

- This refactor is **required before deploying** or sharing the repo
- The exposed Gemini API key must be revoked ASAP
- Once complete, the project will match resume/LinkedIn documentation
- README is already written and ready to copy once code is fixed
