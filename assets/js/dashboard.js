// Dashboard and Interactive Live Demo Functionality

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle for mobile
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('dashboard-sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
  }

  // Close sidebar on click outside or close button
  const sidebarClose = document.getElementById('sidebar-close');
  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', () => {
      sidebar.classList.remove('show');
    });
  }

  // 1. --- INTERACTIVE SVG CHART FOR DASHBOARD ---
  const chartContainer = document.getElementById('dashboard-chart-container');
  if (chartContainer) {
    const chartData = {
      '7days': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        conversations: [1200, 1450, 1300, 1600, 1850, 1100, 1250],
        deflection: [62, 65, 64, 68, 70, 68, 68]
      },
      '30days': {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        conversations: [5200, 6100, 5800, 6800],
        deflection: [60, 64, 66, 68]
      }
    };

    function renderSVGChart(period = '7days') {
      const data = chartData[period];
      const width = chartContainer.clientWidth || 600;
      const height = 200;
      const padding = 30;
      
      const maxVal = Math.max(...data.conversations) * 1.15;
      const minVal = 0;
      
      const points = data.conversations.map((val, idx) => {
        const x = padding + (idx * (width - padding * 2) / (data.conversations.length - 1));
        const y = height - padding - ((val - minVal) * (height - padding * 2) / (maxVal - minVal));
        return { x, y, value: val, label: data.labels[idx], deflection: data.deflection[idx] };
      });

      let pathD = `M ${points[0].x} ${points[0].y} `;
      for (let i = 1; i < points.length; i++) {
        // Smooth curve calculation
        const cpX1 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
        const cpY1 = points[i-1].y;
        const cpX2 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
        const cpY2 = points[i].y;
        pathD += `C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y} `;
      }

      // Generate points elements
      let circlesHtml = '';
      let labelsHtml = '';
      let gridLinesHtml = '';

      // Draw Grid lines
      for (let i = 0; i <= 3; i++) {
        const yVal = height - padding - (i * (height - padding * 2) / 3);
        const textVal = Math.round(minVal + (i * (maxVal - minVal) / 3));
        gridLinesHtml += `
          <line x1="${padding}" y1="${yVal}" x2="${width - padding}" y2="${yVal}" stroke="var(--border-color)" stroke-width="1" stroke-dasharray="4" />
          <text x="${padding - 5}" y="${yVal + 4}" fill="var(--text-muted)" font-size="10" text-anchor="end">${textVal}</text>
        `;
      }

      points.forEach((pt, idx) => {
        circlesHtml += `
          <circle class="chart-point" cx="${pt.x}" cy="${pt.y}" r="5" fill="var(--primary)" stroke="var(--bg-color)" stroke-width="2" 
                  data-val="${pt.value}" data-lbl="${pt.label}" data-defl="${pt.deflection}" />
        `;
        labelsHtml += `
          <text x="${pt.x}" y="${height - 10}" fill="var(--text-muted)" font-size="11" text-anchor="middle">${pt.label}</text>
        `;
      });

      const svgContent = `
        <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.3"></stop>
              <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.00"></stop>
            </linearGradient>
          </defs>
          ${gridLinesHtml}
          <!-- Filled area under the curve -->
          <path d="${pathD} L ${points[points.length-1].x} ${height - padding} L ${points[0].x} ${height - padding} Z" fill="url(#chartGradient)" />
          <!-- Main line path -->
          <path class="svg-chart-path" d="${pathD}" fill="none" stroke="var(--primary)" stroke-width="3" />
          ${circlesHtml}
          ${labelsHtml}
        </svg>
        <div id="chart-tooltip" class="glass-panel p-2 position-absolute d-none" style="pointer-events: none; font-size: 11px; z-index: 100;"></div>
      `;

      chartContainer.innerHTML = svgContent;

      // Add tooltips
      const pointsElements = chartContainer.querySelectorAll('.chart-point');
      const tooltip = document.getElementById('chart-tooltip');
      pointsElements.forEach(pt => {
        pt.addEventListener('mouseenter', (e) => {
          const val = e.target.getAttribute('data-val');
          const lbl = e.target.getAttribute('data-lbl');
          const defl = e.target.getAttribute('data-defl');
          
          tooltip.innerHTML = `
            <strong>${lbl}</strong><br/>
            Conversations: <span class="text-primary">${val}</span><br/>
            Deflection Rate: <span class="text-success">${defl}%</span>
          `;
          tooltip.classList.remove('d-none');
          
          const rect = chartContainer.getBoundingClientRect();
          const cx = parseFloat(e.target.getAttribute('cx'));
          const cy = parseFloat(e.target.getAttribute('cy'));
          tooltip.style.left = `${cx - 50}px`;
          tooltip.style.top = `${cy - 70}px`;
        });

        pt.addEventListener('mouseleave', () => {
          tooltip.classList.add('d-none');
        });
      });
    }

    renderSVGChart('7days');

    // Handle view period switch buttons
    const filterButtons = document.querySelectorAll('[data-chart-filter]');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active', 'btn-primary'));
        filterButtons.forEach(b => b.classList.add('btn-light'));
        
        btn.classList.remove('btn-light');
        btn.classList.add('active', 'btn-primary');
        
        const period = btn.getAttribute('data-chart-filter');
        renderSVGChart(period);
      });
    });

    window.addEventListener('resize', () => renderSVGChart('7days'));
  }

  // 2. --- ROI CALCULATOR FOR DASHBOARD AND HOME ---
  const roiVolumeInput = document.getElementById('roi-volume');
  const roiCostInput = document.getElementById('roi-cost');
  
  function calculateROI() {
    const volumeVal = parseFloat(roiVolumeInput ? roiVolumeInput.value : 10000);
    const costVal = parseFloat(roiCostInput ? roiCostInput.value : 15);
    const deflectionRate = 0.68; // 68%

    const savingsVal = Math.round(volumeVal * deflectionRate * costVal);
    const chatCostVal = Math.round(volumeVal * 0.08); // Professional plan $0.08 per conversation
    const netSavings = savingsVal - chatCostVal;

    const savingsDisplay = document.getElementById('roi-savings-display');
    const netDisplay = document.getElementById('roi-net-display');

    if (savingsDisplay) savingsDisplay.innerText = `$${savingsVal.toLocaleString()}`;
    if (netDisplay) netDisplay.innerText = `$${netSavings.toLocaleString()}`;
  }

  if (roiVolumeInput && roiCostInput) {
    roiVolumeInput.addEventListener('input', calculateROI);
    roiCostInput.addEventListener('input', calculateROI);
    calculateROI();
  }

  // 3. --- KNOWLEDGE BASE MANAGEMENT SIMULATOR ---
  const kbForm = document.getElementById('kb-add-form');
  const kbTableBody = document.querySelector('#kb-table tbody');
  
  if (kbForm && kbTableBody) {
    kbForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const docTitleInput = document.getElementById('kb-doc-title');
      const docTypeSelect = document.getElementById('kb-doc-type');
      
      const title = docTitleInput.value.trim();
      const type = docTypeSelect.value;
      if (!title) return;

      const newRow = document.createElement('tr');
      newRow.style.opacity = '0.5';
      newRow.style.transition = 'all 0.5s ease';
      
      const id = Date.now();
      newRow.innerHTML = `
        <td><i class="bi bi-file-earmark-text me-2 text-primary"></i> ${title} <small class="text-muted">(${type})</small></td>
        <td class="status-cell"><span class="badge bg-secondary"><i class="bi bi-arrow-repeat spin me-1"></i> Parsing...</span></td>
        <td>Just now</td>
        <td>
          <button class="btn btn-sm btn-light py-1 px-2" disabled><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-light text-danger py-1 px-2 delete-kb" data-id="${id}"><i class="bi bi-trash"></i></button>
        </td>
      `;

      kbTableBody.prepend(newRow);
      docTitleInput.value = '';

      // Close modal
      const modalEl = document.getElementById('addDocModal');
      if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
      }

      // Status transitions simulation
      setTimeout(() => {
        newRow.style.opacity = '0.8';
        const cell = newRow.querySelector('.status-cell');
        if (cell) cell.innerHTML = `<span class="badge bg-warning text-dark"><i class="bi bi-cpu me-1"></i> Indexing...</span>`;
        
        setTimeout(() => {
          newRow.style.opacity = '1';
          if (cell) cell.innerHTML = `<span class="badge bg-success"><i class="bi bi-check-all me-1"></i> Trained</span>`;
        }, 3000);
      }, 2000);
    });

    // Delete handling
    kbTableBody.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete-kb');
      if (deleteBtn) {
        if (confirm('Are you sure you want to remove this document from the knowledge base?')) {
          const row = deleteBtn.closest('tr');
          row.style.opacity = '0';
          row.style.transform = 'translateX(20px)';
          setTimeout(() => row.remove(), 500);
        }
      }
    });
  }

  // 4. --- LIVE CONVERSATION LOGS SIMULATOR ---
  const logsTableBody = document.querySelector('#logs-table tbody');
  const transcriptArea = document.getElementById('log-transcript-messages');
  const transcriptUserId = document.getElementById('transcript-user-id');
  const transcriptStatusBadge = document.getElementById('transcript-status-badge');
  const takeoverBtn = document.getElementById('takeover-btn');

  // Preloaded logs & detailed transcripts
  const initialLogs = [
    { id: '#1024', query: '"How do I reset my password?"', status: 'Resolved (AI)', time: '2 mins ago',
      chat: [
        { sender: 'user', text: 'Hi, I forgot my password.' },
        { sender: 'bot', text: 'No worries! You can reset your password by going to the login page and clicking "Forgot Password". We will email you a secure link.' },
        { sender: 'user', text: 'Perfect, got the link. Thanks!' }
      ]
    },
    { id: '#1025', query: '"I need to speak to a human."', status: 'Escalated', time: '5 mins ago',
      chat: [
        { sender: 'user', text: 'My invoice is showing an incorrect charge. Can you fix it?' },
        { sender: 'bot', text: 'I apologize for the inconvenience. Let me retrieve your account details.' },
        { sender: 'bot', text: 'For security reasons, I need a billing agent to verify this invoice correction. I am transferring you now.' },
        { sender: 'user', text: 'I need to speak to a human.' }
      ]
    }
  ];

  function loadTranscript(log) {
    if (!transcriptArea) return;
    transcriptUserId.innerText = `User ID: ${log.id}`;
    
    let statusClass = 'bg-success';
    if (log.status === 'Escalated') statusClass = 'bg-warning text-dark';
    else if (log.status === 'Active') statusClass = 'bg-info';
    
    transcriptStatusBadge.innerHTML = `<span class="badge ${statusClass}">${log.status}</span>`;
    
    transcriptArea.innerHTML = log.chat.map(msg => `
      <div class="chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}">
        <p class="mb-0">${msg.text}</p>
      </div>
    `).join('');

    if (log.status === 'Escalated') {
      takeoverBtn.style.display = 'block';
      takeoverBtn.onclick = () => {
        alert('You have successfully hijacked the chat. The client chatbot has been paused.');
        log.status = 'Resolved (Human)';
        loadTranscript(log);
        refreshTable();
      };
    } else {
      if (takeoverBtn) takeoverBtn.style.display = 'none';
    }
  }

  function refreshTable() {
    if (!logsTableBody) return;
    logsTableBody.innerHTML = initialLogs.map((log, index) => {
      let badgeClass = 'bg-success';
      if (log.status === 'Escalated') badgeClass = 'bg-warning text-dark';
      else if (log.status === 'Active') badgeClass = 'bg-info';
      else if (log.status.includes('Human')) badgeClass = 'bg-primary';

      return `
        <tr class="log-row" data-index="${index}" style="cursor: pointer;">
          <td><span class="status-indicator ${log.status.toLowerCase().includes('escal') ? 'escalated' : 'active'}"></span> ${log.id}</td>
          <td class="text-truncate" style="max-width: 250px;">${log.query}</td>
          <td><span class="badge ${badgeClass}">${log.status}</span></td>
          <td>${log.time}</td>
        </tr>
      `;
    }).join('');

    // Row clicks
    const rows = logsTableBody.querySelectorAll('.log-row');
    rows.forEach(row => {
      row.addEventListener('click', () => {
        const index = row.getAttribute('data-index');
        loadTranscript(initialLogs[index]);
      });
    });
  }

  if (logsTableBody) {
    refreshTable();
    if (initialLogs.length > 0) {
      loadTranscript(initialLogs[0]);
    }

    // Periodically push simulated incoming query
    setInterval(() => {
      const simulatedQueries = [
        {
          id: `#10${Math.floor(Math.random() * 100) + 26}`,
          query: '"Do you ship to the UK?"',
          status: 'Resolved (AI)',
          time: 'Just now',
          chat: [
            { sender: 'user', text: 'Hello, do you ship to the UK?' },
            { sender: 'bot', text: 'Yes, we offer standard international shipping to the UK. It typically takes 5-7 business days.' }
          ]
        },
        {
          id: `#10${Math.floor(Math.random() * 100) + 26}`,
          query: '"My order hasn\'t arrived yet."',
          status: 'Escalated',
          time: 'Just now',
          chat: [
            { sender: 'user', text: 'My order #A983 hasn\'t arrived yet.' },
            { sender: 'bot', text: 'Let me look up order #A983 for you.' },
            { sender: 'bot', text: 'Hmm, it seems to be stuck in customs. Let me get a human agent to review the shipping carrier logs.' }
          ]
        }
      ];

      const newLog = simulatedQueries[Math.floor(Math.random() * simulatedQueries.length)];
      initialLogs.unshift(newLog);
      if (initialLogs.length > 8) initialLogs.pop(); // keep log lists clean
      refreshTable();
    }, 15000);
  }
});
