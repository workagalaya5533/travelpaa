<Card className="destination-card h-full">
  <style>{`
    .destination-card {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 1rem;
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.25);
      width: 100%;
      height: 100%;
      font-family: 'Inter', Arial, sans-serif;
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
    }

    .destination-card:hover {
      box-shadow: 0px 12px 34px rgba(0,0,0,0.45);
      transform: translateY(-6px) scale(1.02);
    }

    /* Image wrapper gets faint overlay */
    .destination-img-wrap {
      position: relative;
      height: 200px;
      width: 100%;
      overflow: hidden;
      flex-shrink: 0;
    }
    .destination-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-bottom: 1px solid rgba(255,255,255,0.25);
    }

    /* Frosty pill for match percentage */
    .destination-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px) saturate(180%);
      -webkit-backdrop-filter: blur(8px) saturate(180%);
      color: #fff;
      font-weight: 700;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 0.86rem;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .destination-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
      color: #fff; /* text on glass should be light */
    }

    .destination-title {
      font-size: 1.35rem;
      font-weight: 700;
      margin: 0;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      letter-spacing: -0.01em;
      line-height: 1.2;
    }

    .destination-location {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.92rem;
      font-weight: 500;
      color: rgba(255,255,255,0.85);
      margin-top: 6px;
      margin-bottom: 10px;
    }
    .destination-description {
      font-size: 0.96rem;
      line-height: 1.55;
      color: rgba(255,255,255,0.85);
      margin-bottom: 12px;
      flex-grow: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .destination-info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      font-size: 0.92rem;
      color: rgba(255,255,255,0.9);
    }
    .safety {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
    }
    .safety-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }

    .destination-buttons {
      display: flex;
      gap: 12px;
    }
    .destination-btn {
      flex: 1;
      border-radius: 0.8rem;
      font-size: 0.95rem;
      font-weight: 600;
      padding: 0.7rem;
      min-height: 44px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255,255,255,0.3);
      transition: all 0.15s ease;
    }
    .destination-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.3);
    }
    .destination-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}</style>
  {/* your JSX content stays the same */}
</Card>