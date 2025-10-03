# 🚀 Vercel Deployment Guide

## Why Vercel?

✅ **Perfect for Next.js**: Made by the Next.js team  
✅ **Zero Configuration**: Automatic detection and optimization  
✅ **Built-in Features**: API routes, serverless functions, edge functions  
✅ **Database Integration**: Easy MongoDB Atlas integration  
✅ **Environment Variables**: Simple setup for secrets  
✅ **Preview Deployments**: Every push gets a preview URL  

## Deployment Steps

### 1. Prepare Your Repository

```bash
# Make sure your code is committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? preparation-tracker (or your choice)
# - Directory? ./
# - Override settings? No
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings

### 3. Configure Environment Variables

In your Vercel project dashboard:

#### Required Variables:
```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/preparation-tracker?retryWrites=true&w=majority
```

#### Optional Variables (if using Google OAuth):
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Generate Secrets

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Or use online generator
# https://generate-secret.vercel.app/32
```

### 5. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist Vercel IPs (0.0.0.0/0 for all IPs)
5. Get your connection string

### 6. Deploy and Test

```bash
# Deploy
vercel --prod

# Or push to main branch (auto-deploys)
git push origin main
```

## Post-Deployment

### 1. Test Your App
- Visit your Vercel URL
- Test authentication
- Test database operations
- Check all pages load correctly

### 2. Set Up Custom Domain (Optional)
- Go to Vercel dashboard → Settings → Domains
- Add your custom domain
- Update DNS records

### 3. Monitor Performance
- Check Vercel Analytics
- Monitor API routes performance
- Set up error tracking

## Troubleshooting

### Common Issues:

1. **Build Errors**: Check Vercel build logs
2. **Environment Variables**: Ensure all required vars are set
3. **Database Connection**: Verify MongoDB Atlas settings
4. **Authentication**: Check NextAuth configuration

### Useful Commands:
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy
vercel --prod
```

## Benefits of Vercel Deployment:

- ⚡ **Fast**: Global CDN and edge functions
- 🔒 **Secure**: Automatic HTTPS and security headers
- 📊 **Analytics**: Built-in performance monitoring
- 🔄 **CI/CD**: Automatic deployments on git push
- 💰 **Free Tier**: Generous free tier for personal projects
- 🌍 **Global**: Deployed to multiple regions

Your app will be live at: `https://your-app-name.vercel.app`
