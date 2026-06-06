import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Award, Calendar, CheckCircle, X, Download, ExternalLink,
  ShieldCheck, ZoomIn, AlertTriangle, Loader2, FileQuestion
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
//  CERTIFICATE DATA
//  ─────────────────────────────────────────────────────────────────────────────
//  To add a new certificate: copy any object below, give it a new id,
//  and paste the certificate URL (Google Drive share link, direct PDF/image
//  URL, or any embeddable link) into certificateUrl.
//  Google Drive links are auto-converted to preview embeds — no extra steps!
// ═══════════════════════════════════════════════════════════════════════════════
const certificates = [
  {
    id: 1,
    title: 'OCI 2025 AI Foundations Associate',
    issuer: 'Oracle University',
    date: 'Feb 2026',
    type: 'Professional Certification',
    verified: true,
    badge: '🤖',
    glowColor: 'rgba(139,92,246,0.35)',
    certificateUrl: ' https://drive.google.com/file/d/1ozTIj5u4ooUN8-M0bUvQCNdEgydfWuA2/view?usp=drive_link',
  },
  {
    id: 2,
    title: 'VIBE-A-THON 2026 Participant',
    issuer: 'NMIT Bengaluru',
    date: 'May 2026',
    type: 'Hackathon Participation',
    verified: true,
    badge: '🏆',
    glowColor: 'rgba(0,229,255,0.30)',
    certificateUrl: 'https://drive.google.com/file/d/1QWJlJMYbaQFDcvLkel72mbxeI-nAXrXn/view?usp=drive_link',
  },
  {
    id: 3,
    title: 'Machine Learning Foundation',
    issuer: 'Infosys Springboard',
    date: 'Apr 2026',
    type: 'Certification',
    verified: true,
    badge: '🧠',
    glowColor: 'rgba(0,255,136,0.28)',
    certificateUrl: 'https://drive.google.com/file/d/1E1t2EPd4CaDwScd-EGNRNiIANHnIbt8D/view?usp=drive_link',
  },
  {
    id: 4,
    title: 'Citizen Data Science (Python)',
    issuer: 'Infosys Springboard',
    date: 'Oct 2025',
    type: 'Certification',
    verified: true,
    badge: '📊',
    glowColor: 'rgba(59,130,246,0.30)',
    certificateUrl: 'https://drive.google.com/file/d/1vIlDZlXti5Gmul-5o8dw2EplPXg0yf8h/view?usp=drive_link',
  },
  {
    id: 5,
    title: 'Data Visualisation (Python)',
    issuer: 'Infosys Springboard',
    date: 'Oct 2025',
    type: 'Course Completion',
    verified: true,
    badge: '📈',
    glowColor: 'rgba(236,72,153,0.28)',
    certificateUrl: 'https://drive.google.com/file/d/1tTL7bgKxnOxIdZprnPAzqf4AmEvO7DWL/view?usp=drive_link',
  },
  {
    id: 6,
    title: 'Operating Systems Basics',
    issuer: 'Cisco Networking Academy',
    date: 'Apr 2025',
    type: 'Coursework',
    verified: true,
    badge: '🖥️',
    glowColor: 'rgba(249,115,22,0.28)',
    certificateUrl: 'https://drive.google.com/file/d/1odJDwpEti4Sw-kcnyNt99U6-_PV6IqpE/view?usp=drive_link',
  },
  {
    id: 7,
    
    title: 'introduction to unix',
    issuer: 'Infosys Springboard',
    date: 'Apr 2025',
    type: 'Coursework',
    verified: true,
    badge: '🐧',
    glowColor: 'rgba(234,179,8,0.28)',
    certificateUrl: 'https://drive.google.com/file/d/1Ym0-wtKFEZ1p7Btj09KWCAnxHmtrekuL/view?usp=drive_link',
    
  },
  {
    id: 8,
     
    title: 'Unix Linux OS',
    issuer: 'Infosys Springboard',
    date: 'Apr 2025',
    type: 'Coursework',
    verified: true,
    badge: '🐧',
    glowColor: 'rgba(234,179,8,0.28)',
    
    certificateUrl:'https://drive.google.com/file/d/1DiDtZNvHW-WPjeVj_0_YBViHE_52NYN-/view?usp=drive_link'
  },
  {
    id: 9, 
    title: 'Google Cloud Engineering Certificate',
    issuer: 'Google Cloud',
    date: 'Apr 2026', 
    type: 'Professional Certification',
    verified: true,
    badge: '☁️',
    glowColor: 'rgba(66, 133, 244, 0.30)', 
    certificateUrl: 'https://drive.google.com/file/d/1s41B0eRkX52tAlEcZnVnlm-dtUUj64xR/view?usp=sharing', 
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  URL UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Extracts the Google Drive FILE_ID from any share link variant:
 *   https://drive.google.com/file/d/FILE_ID/view
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/open?id=FILE_ID
 *   https://drive.google.com/uc?id=FILE_ID&export=...
 *
 * Returns null if this isn't a recognised Google Drive URL.
 */
function extractGoogleDriveId(url) {
  if (!url) return null;

  // /file/d/<id>/ — most common share link
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  // ?id=<id>  or  &id=<id>  — open / uc style links
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  return null;
}

/**
 * Returns { embedUrl, downloadUrl, openUrl, type, isGoogleDrive }
 *
 * Google Drive links are converted to:
 *   embedUrl    →  /file/d/FILE_ID/preview  (Google’s own embeddable viewer — no Drive chrome)
 *   downloadUrl →  uc?export=download&id=FILE_ID
 *   openUrl     →  the original share link   (opens full Drive UI in a new tab)
 *
 * All other URLs:
 *   embedUrl = downloadUrl = openUrl = the original URL
 */
function resolveUrl(rawUrl) {
  if (!rawUrl || rawUrl === 'PASTE_CERTIFICATE_LINK_HERE') {
    return { embedUrl: null, downloadUrl: null, openUrl: null, type: 'placeholder', isGoogleDrive: false };
  }

  const url = rawUrl.trim();

  // ── Google Drive ──────────────────────────────────────────────────────────
  if (url.includes('drive.google.com')) {
    const fileId = extractGoogleDriveId(url);
    if (fileId) {
      return {
        // /preview — Google’s embeddable viewer, renders the file without the Drive navigation shell
        embedUrl:    `https://drive.google.com/file/d/${fileId}/preview`,
        // uc?export=download — direct download link
        downloadUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
        // original share link — opens the full Drive UI in a new tab
        openUrl: url,
        type: 'iframe',        // /preview is an HTML page — must use iframe
        isGoogleDrive: true,
      };
    }
    // Unrecognised Drive URL — fall through to generic iframe
  }

  // ── Image extensions ──────────────────────────────────────────────────────
  const imgExts = /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i;
  if (imgExts.test(url)) {
    return { embedUrl: url, downloadUrl: url, openUrl: url, type: 'image', isGoogleDrive: false };
  }

  // ── PDF extension ─────────────────────────────────────────────────────────
  if (/\.pdf(\?.*)?$/i.test(url)) {
    return { embedUrl: url, downloadUrl: url, openUrl: url, type: 'iframe', isGoogleDrive: false };
  }

  // ── Anything else — try iframe embed ─────────────────────────────────────
  return { embedUrl: url, downloadUrl: url, openUrl: url, type: 'iframe', isGoogleDrive: false };
}

/** Validate that a string looks like a URL. */
function isValidUrl(str) {
  try { return Boolean(new URL(str)); } catch { return false; }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CERTIFICATE MODAL
// ═══════════════════════════════════════════════════════════════════════════════
function CertificateModal({ cert, onClose }) {
  const overlayRef      = useRef(null);
  const [closing, setClosing]   = useState(false);
  const [loading, setLoading]   = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [zoom, setZoom]         = useState(1);

  const zoomIn    = () => setZoom(z => Math.min(z + 0.25, 3));
  const zoomOut   = () => setZoom(z => Math.max(z - 0.25, 0.5));
  const zoomReset = () => setZoom(1);

  const { embedUrl, downloadUrl, openUrl, type, isGoogleDrive } = resolveUrl(cert.certificateUrl);
  const isPlaceholder = type === 'placeholder';
  const urlInvalid    = !isPlaceholder && !isValidUrl(cert.certificateUrl || '');

  // ── Close helpers ─────────────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 320);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  // Reset loading + zoom state when cert changes
  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    setZoom(1);
  }, [cert.id]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* ── Modal animations ── */
        @keyframes cert-fade-in  { from{opacity:0}       to{opacity:1} }
        @keyframes cert-fade-out { from{opacity:1}       to{opacity:0} }
        @keyframes cert-pop-in   { from{opacity:0;transform:scale(.88) translateY(28px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes cert-pop-out  { from{opacity:1;transform:scale(1) translateY(0)}     to{opacity:0;transform:scale(.88) translateY(28px)} }
        @keyframes cert-spin     { to{transform:rotate(360deg)} }

        .cert-overlay-in  { animation: cert-fade-in  .28s cubic-bezier(.22,1,.36,1) forwards }
        .cert-overlay-out { animation: cert-fade-out .30s cubic-bezier(.22,1,.36,1) forwards }
        .cert-panel-in    { animation: cert-pop-in   .33s cubic-bezier(.22,1,.36,1) forwards }
        .cert-panel-out   { animation: cert-pop-out  .28s cubic-bezier(.22,1,.36,1) forwards }
        .cert-spin        { animation: cert-spin 1s linear infinite }

        /* ── Modal panel — responsive sizing ── */
        .cert-panel {
          width: 90vw;
          height: 90vh;
          max-width: 1400px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(145deg,rgba(17,24,39,.97) 0%,rgba(11,17,32,.99) 100%);
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 20px;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .cert-panel { width: 100vw; height: 100dvh; max-width: 100vw; border-radius: 0; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .cert-panel { width: 95vw; height: 90vh; }
        }

        /* ── Action buttons ── */
        .cert-btn {
          display:inline-flex; align-items:center; gap:6px;
          padding:8px 16px; border-radius:10px; font-size:13px;
          font-weight:600; cursor:pointer; text-decoration:none;
          border:1px solid transparent;
          transition:transform .2s ease, filter .2s ease;
          white-space:nowrap;
        }
        .cert-btn:hover  { transform:translateY(-2px); filter:brightness(1.18); }
        .cert-btn:active { transform:translateY(0); }
        .cert-btn-dl  { background:linear-gradient(135deg,#00E5FF18,#8B5CF618); border-color:#00E5FF50; color:#00E5FF; }
        .cert-btn-ext { background:linear-gradient(135deg,#8B5CF618,#00FF8818); border-color:#8B5CF650; color:#a78bfa; }

        /* ── Zoom buttons ── */
        .cert-zoom-btn {
          display:inline-flex; align-items:center; justify-content:center;
          width:32px; height:32px; border-radius:8px; font-size:16px; font-weight:700;
          cursor:pointer; border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.06); color:#e5e7eb;
          transition:background .18s,border-color .18s,transform .15s;
          flex-shrink:0;
        }
        .cert-zoom-btn:hover  { background:rgba(0,229,255,.15); border-color:rgba(0,229,255,.4); color:#00E5FF; transform:scale(1.1); }
        .cert-zoom-btn:active { transform:scale(.95); }
        .cert-zoom-label {
          font-size:12px; font-weight:600; color:#6b7280;
          min-width:38px; text-align:center; user-select:none;
        }

        /* ── X close ── */
        .cert-close-btn {
          display:flex; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:50%;
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12);
          color:#9ca3af; cursor:pointer; flex-shrink:0;
          transition:background .2s,border-color .2s,color .2s,transform .25s;
        }
        .cert-close-btn:hover {
          background:rgba(239,68,68,.18); border-color:rgba(239,68,68,.4);
          color:#f87171; transform:rotate(90deg);
        }

        /* ── Viewer wrapper (fills remaining panel height) ── */
        .cert-viewer-wrap {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #05080f;
        }

        /* ── Zoom scroll container ── */
        .cert-zoom-scroll {
          flex: 1;
          min-height: 0;
          overflow: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #05080f;
        }

        /* ── iframe / img inside zoom container ── */
        .cert-zoom-inner {
          transform-origin: center center;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .cert-zoom-inner iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          background: transparent;
        }
        .cert-zoom-inner img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* ── Overlay states ── */
        .cert-state-overlay {
          position:absolute; inset:0;
          display:flex; flex-direction:column; align-items:center;
          justify-content:center; gap:14px;
          background:#05080f; z-index:2;
        }
        .cert-state-title  { font-size:15px; font-weight:600; color:#e5e7eb; margin:0; }
        .cert-state-sub    { font-size:13px; color:#6b7280; margin:4px 0 0; text-align:center; max-width:420px; line-height:1.6; }
        .cert-code         { color:#00E5FF; background:rgba(0,229,255,.1); padding:2px 7px; border-radius:4px; font-size:12px; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={closing ? 'cert-overlay-out' : 'cert-overlay-in'}
        style={{
          position:'fixed', inset:0, zIndex:9999,
          background:'rgba(5,8,17,.86)',
          backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          padding:'0',
        }}
      >
        {/* ── Panel ── */}
        <div
          className={`cert-panel ${closing ? 'cert-panel-out' : 'cert-panel-in'}`}
          style={{ boxShadow:`0 0 80px ${cert.glowColor}, 0 40px 100px rgba(0,0,0,.8)` }}
        >
          {/* ── Header ── */}
          <div style={{
            display:'flex', alignItems:'flex-start', gap:'14px',
            padding:'20px 24px 16px',
            borderBottom:'1px solid rgba(255,255,255,.07)',
            background:'rgba(255,255,255,.025)',
            flexShrink:0,
          }}>
            {/* Emoji badge */}
            <div style={{
              fontSize:'30px', lineHeight:1,
              background:'rgba(255,255,255,.05)', borderRadius:'12px',
              padding:'8px 12px', flexShrink:0,
            }}>
              {cert.badge}
            </div>

            {/* Meta */}
            <div style={{ flex:1, minWidth:0 }}>
              <span style={{
                fontSize:'10px', fontWeight:700, letterSpacing:'.12em',
                textTransform:'uppercase', color:'#6b7280',
                background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)',
                borderRadius:'6px', padding:'3px 8px', display:'inline-block', marginBottom:'8px',
              }}>
                {cert.type}
              </span>

              <h3 style={{
                margin:0, fontFamily:'"Orbitron",sans-serif',
                fontSize:'clamp(13px,2.4vw,18px)', fontWeight:700,
                color:'#fff', lineHeight:1.3,
              }}>
                {cert.title}
              </h3>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', marginTop:'8px', alignItems:'center' }}>
                <span style={{ color:'#9ca3af', fontSize:'13px' }}>
                  <Award size={12} style={{ display:'inline', verticalAlign:'middle', marginRight:'4px', opacity:.7 }} />
                  {cert.issuer}
                </span>
                <span style={{ color:'#6b7280', fontSize:'13px' }}>
                  <Calendar size={12} style={{ display:'inline', verticalAlign:'middle', marginRight:'4px', opacity:.7 }} />
                  {cert.date}
                </span>
                {cert.verified && (
                  <span style={{ display:'flex', alignItems:'center', gap:'4px', color:'#00FF88', fontSize:'12px', fontWeight:600 }}>
                    <ShieldCheck size={13} /> Verified
                  </span>
                )}
              </div>
            </div>

            {/* X button */}
            <button className="cert-close-btn" onClick={handleClose} aria-label="Close modal">
              <X size={16} />
            </button>
          </div>

          {/* ── Viewer area — fills all remaining panel height ── */}
          <div className="cert-viewer-wrap">

            {/* ── PLACEHOLDER ── */}
            {isPlaceholder && (
              <div className="cert-state-overlay" style={{ position:'relative', flex:1, minHeight:'300px' }}>
                <FileQuestion size={52} style={{ opacity:.35, color:'#6b7280' }} />
                <p className="cert-state-title">No Certificate URL Added Yet</p>
                <p className="cert-state-sub">
                  Open <span className="cert-code">Certifications.jsx</span> and replace{' '}
                  <span className="cert-code">PASTE_CERTIFICATE_LINK_HERE</span> with your certificate URL for{' '}
                  <strong style={{ color:'#e5e7eb' }}>{cert.title}</strong>.
                </p>
                <p className="cert-state-sub" style={{ fontSize:'12px', marginTop:'-6px' }}>
                  Supports Google Drive links, direct PDF/image URLs, or any embeddable link.
                </p>
              </div>
            )}

            {/* ── INVALID URL ── */}
            {urlInvalid && !isPlaceholder && (
              <div className="cert-state-overlay" style={{ position:'relative', flex:1, minHeight:'300px' }}>
                <AlertTriangle size={48} style={{ color:'#f59e0b', opacity:.8 }} />
                <p className="cert-state-title">Invalid Certificate URL</p>
                <p className="cert-state-sub">
                  The URL provided for <strong style={{ color:'#e5e7eb' }}>{cert.title}</strong> doesn't look valid.
                  Please check the <span className="cert-code">certificateUrl</span> field.
                </p>
              </div>
            )}

            {/* ── VALID URL ── */}
            {!isPlaceholder && !urlInvalid && (
              <div style={{ flex:1, minHeight:0, position:'relative', display:'flex', flexDirection:'column' }}>

                {/* Loading overlay */}
                {loading && (
                  <div className="cert-state-overlay">
                    <Loader2 size={40} className="cert-spin" style={{ color:'#00E5FF' }} />
                    <p className="cert-state-sub">Loading certificate…</p>
                  </div>
                )}

                {/* Embed-blocked / load-error fallback */}
                {loadError && (
                  <div className="cert-state-overlay">
                    <AlertTriangle size={44} style={{ color:'#f59e0b', opacity:.9 }} />
                    <p className="cert-state-title">Preview unavailable</p>
                    <p className="cert-state-sub">
                      {isGoogleDrive
                        ? 'Google Drive is blocking the preview. Make sure the file sharing is set to “Anyone with the link”.'
                        : 'This certificate cannot be embedded directly (the provider restricts iframe embedding).'}
                    </p>
                    <a
                      href={openUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-btn cert-btn-ext"
                      style={{ marginTop:'6px' }}
                    >
                      <ExternalLink size={14} />
                      {isGoogleDrive ? 'Open in Google Drive' : 'Open Original Certificate'}
                    </a>
                  </div>
                )}

                {/* Zoom scroll container */}
                <div
                  className="cert-zoom-scroll"
                  style={{ opacity: loading ? 0 : 1, transition:'opacity .3s ease' }}
                >
                  <div
                    className="cert-zoom-inner"
                    style={{
                      transform: `scale(${zoom})`,
                      transition: 'transform .22s cubic-bezier(.22,1,.36,1)',
                      /* For iframe: fixed size at scale=1 so zoom works */
                      ...(type === 'iframe' ? { width:'100%', height:'100%' } : {}),
                    }}
                  >
                    {type === 'image' ? (
                      <img
                        src={embedUrl}
                        alt={cert.title}
                        style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }}
                        onLoad={() => setLoading(false)}
                        onError={() => { setLoading(false); setLoadError(true); }}
                      />
                    ) : (
                      <iframe
                        key={embedUrl}
                        src={embedUrl}
                        title={cert.title}
                        allow="autoplay"
                        onLoad={() => setLoading(false)}
                        onError={() => { setLoading(false); setLoadError(true); }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div style={{
            display:'flex', flexWrap:'wrap', gap:'10px',
            padding:'10px 20px 14px',
            borderTop:'1px solid rgba(255,255,255,.06)',
            alignItems:'center',
            justifyContent:'space-between',
            flexShrink:0,
            background:'rgba(255,255,255,.018)',
          }}>

            {/* Left — zoom controls */}
            {!isPlaceholder && !urlInvalid && !loadError && (
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <button className="cert-zoom-btn" onClick={zoomOut}  title="Zoom out" aria-label="Zoom out">−</button>
                <span className="cert-zoom-label">{Math.round(zoom * 100)}%</span>
                <button className="cert-zoom-btn" onClick={zoomIn}   title="Zoom in"  aria-label="Zoom in">+</button>
                <button
                  className="cert-zoom-btn"
                  onClick={zoomReset}
                  title="Reset zoom"
                  aria-label="Reset zoom"
                  style={{ width:'auto', padding:'0 10px', fontSize:'11px', fontWeight:700 }}
                >
                  Reset
                </button>
              </div>
            )}
            {(isPlaceholder || urlInvalid || loadError) && <span />}

            {/* Right — action buttons */}
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'flex-end' }}>
              {!isPlaceholder && !urlInvalid && (
                <a
                  href={downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-btn cert-btn-dl"
                >
                  <Download size={14} /> Download
                </a>
              )}
              {!isPlaceholder && !urlInvalid && (
                <a
                  href={openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-btn cert-btn-ext"
                >
                  <ExternalLink size={14} />
                  {isGoogleDrive ? 'Open in Google Drive' : 'Open Original'}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CERTIFICATE CARD
// ═══════════════════════════════════════════════════════════════════════════════
function CertCard({ cert, onClick }) {
  return (
    <>
      <style>{`
        .cert-card-wrap {
          transition: transform .28s cubic-bezier(.22,1,.36,1),
                      box-shadow  .28s ease;
        }
        .cert-card-wrap:hover {
          transform: translateY(-7px) scale(1.025);
        }
        .cert-hover-chip {
          position:absolute; inset:0;
          background:rgba(0,229,255,.06);
          display:flex; align-items:center; justify-content:center;
          opacity:0; transition:opacity .22s ease;
          border-radius:inherit;
        }
        .cert-card-outer:hover .cert-hover-chip { opacity:1; }
        .cert-chip-inner {
          display:flex; align-items:center; gap:6px;
          background:rgba(0,229,255,.15); border:1px solid rgba(0,229,255,.35);
          color:#00E5FF; font-size:12px; font-weight:700;
          padding:7px 16px; border-radius:999px; letter-spacing:.04em;
          backdrop-filter:blur(6px);
        }
      `}</style>

      <div
        className="cert-card-outer w-[290px] md:w-[320px] flex-shrink-0 cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label={`View certificate: ${cert.title}`}
        onClick={onClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
        style={{ outline:'none' }}
      >
        <div
          className="cert-card-wrap glass-card p-6 rounded-2xl border border-white/5
            hover:border-white/25 relative overflow-hidden"
          style={{
            ['--cert-glow']: cert.glowColor,
          }}
        >
          {/* Hover glow shadow injected via onMouseEnter/Leave to stay dynamic */}
          <div
            className="cert-card-glow-shadow"
            style={{ position:'absolute', inset:0, borderRadius:'inherit', pointerEvents:'none' }}
          />

          {/* Badge corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full flex items-center justify-center font-bold text-2xl">
            {cert.badge}
          </div>

          {/* Type tag */}
          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            {cert.type}
          </span>

          {/* Title */}
          <h3 className="font-display font-bold text-base md:text-lg text-white mt-5 mb-2 leading-snug">
            {cert.title}
          </h3>

          {/* Issuer */}
          <p className="text-sm text-gray-300 font-medium mb-4">
            {cert.issuer}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {cert.date}
            </span>
            <span className="flex items-center gap-1 text-cyber-cyan font-semibold">
              <CheckCircle size={12} className="text-cyber-green" />
              {cert.verified ? 'Verified' : 'Issued'}
            </span>
          </div>

          {/* Hover overlay chip */}
          <div className="cert-hover-chip">
            <span className="cert-chip-inner">
              <ZoomIn size={13} /> View Certificate
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  // Triple the array for seamless infinite scroll
  const carouselItems = [...certificates, ...certificates, ...certificates];

  return (
    <>
      <section
        id="certifications"
        className="relative py-24 z-20 overflow-hidden bg-cyber-dark/40 border-y border-white/5"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center px-6">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
            Achievements &amp; <span className="text-gradient-cyan-violet">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full" />
          <p className="text-gray-400 text-sm mt-4 max-w-md">
            Click any card to view the full certificate
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B1120] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B1120] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max gap-6 py-4 animate-scroll-track hover:[animation-play-state:paused]">
            {carouselItems.map((cert, idx) => (
              <CertCard
                key={`${cert.id}-${idx}`}
                cert={cert}
                onClick={() => setActiveCert(cert)}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes scroll-track {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(-326px * ${certificates.length})); }
          }
          .animate-scroll-track {
            animation: scroll-track ${certificates.length * 6}s linear infinite;
          }
        `}</style>
      </section>

      {/* Modal — outside section to avoid z-index clipping */}
      {activeCert && (
        <CertificateModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </>
  );
}