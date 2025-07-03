# Sho5 Test Site

Simple membership site with GitHub Pages and Cloudflare Workers.

## Structure

- **GitHub Pages**: Static site hosting
- **Cloudflare Workers**: Stripe webhook handler  
- **GitHub Actions**: Automated member management
- **Gmail**: Magic link email delivery

## Features

- Clean white/black design matching sho5.org
- ¥500/month membership via Stripe Payment Links
- Magic link authentication
- Mobile-optimized (iPhone/iPad tested)

## Deployment

1. Enable GitHub Pages in repository settings
2. Deploy Cloudflare Worker with `cloudflare-worker.js`
3. Set up Stripe webhook pointing to Worker URL
4. Configure GitHub Secrets for email automation

## Live Site

https://yoshida0531a.github.io/sho5-test-site/

## Test on Mobile

- iPhone: Safari, Chrome
- iPad: Safari, Chrome
- All pages responsive and touch-friendly