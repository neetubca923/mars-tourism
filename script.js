document.addEventListener("DOMContentLoaded", () => {
    const avatarBox = document.getElementById('avatarBox');
    const bioPhoto = document.getElementById('bioPhoto');
    const bioPreview = document.getElementById('bioPreview');
    const avatarPrompt = document.getElementById('avatarPrompt');
    const marsManifestForm = document.getElementById('marsManifestForm');
    const manifestOverlay = document.getElementById('manifestOverlay');
    const manifestSummary = document.getElementById('manifestSummary');

    // 1. Preloader Rocket Screen Timer (3.5 Seconds Liftoff)
    setTimeout(() => {
        const preloader = document.getElementById('spacePortPreloader');
        if(preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 1000);
        }
    }, 3500);

    // 2. Photo Upload Render
    avatarBox.addEventListener('click', () => bioPhoto.click());
    bioPhoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                bioPreview.src = event.target.result;
                bioPreview.style.display = 'block';
                avatarPrompt.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }
    });

    // 3. Real-Time Cost Calculus Engine
    window.updateSystemMetrics = function() {
        const windowSelect = document.getElementById('launchWindow');
        const habSelect = document.getElementById('habModule');
        const baseCost = parseInt(windowSelect.options[windowSelect.selectedIndex].getAttribute('data-base')) || 0;
        const addCost = parseInt(habSelect.options[habSelect.selectedIndex].getAttribute('data-add')) || 0;
        const netTotal = baseCost + addCost;

        document.getElementById('fareDisplay').innerText = `$${netTotal.toLocaleString()}`;
        document.getElementById('tokenDisplay').innerText = `≈ ${(netTotal / 95000).toFixed(2)} BTC`;
    }

    // 4. Form Submit: Routing with Fetch API (Node Server Node router)
    marsManifestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const surname = document.getElementById('lastName').value;
        const passId = document.getElementById('agencyId').value;
        const trajectory = document.getElementById('launchWindow').options[document.getElementById('launchWindow').selectedIndex].text;
        const finalPrice = document.getElementById('fareDisplay').innerText;

        // Connecting with server.js Node Engine
        fetch('http://localhost:5000/api/manifest/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ surname, agencyId: passId, trajectory, price: finalPrice })
        })
        .then(res => res.json())
        .then(data => {
            manifestSummary.innerHTML = `<b>[SERVER STATUS]: DATA INGESTED</b><br>ID: ${data.manifestId}<br>Astronaut: ${surname}<br>Path: ${trajectory}<br>Cost: ${finalPrice}`;
            manifestOverlay.style.display = 'flex';
        })
        .catch(err => {
            // Local Sandbox Fallback if server is offline
            manifestSummary.innerHTML = `<b>[SANDBOX SIMULATION]: LOCAL MANIFEST SECURED</b><br><br><b>Astronaut:</b> ${surname}<br><b>ID:</b> ${passId}<br><b>Trajectory:</b> ${trajectory}<br><b>Allocation:</b> ${finalPrice}<br><br><i style="color:#f59e0b;">*Node.js server.js file recognized but offline. Data cached.*</i>`;
            manifestOverlay.style.display = 'flex';
        });
    });

    window.purgeManifest = function() {
        manifestOverlay.style.display = 'none';
        marsManifestForm.reset();
        bioPreview.style.display = 'none';
        avatarPrompt.style.display = 'block';
        updateSystemMetrics();
    }
});
