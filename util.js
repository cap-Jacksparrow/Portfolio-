window.history.scrollRestoration = "manual";
window.scrollTo(0, 0); 
AOS.init({
  once: true,
  // this is the official callback
  // it runs every time an element is shown
  startEvent: 'DOMContentLoaded',
  animatedClassName: 'aos-animate',
  useClassNames: true,
  initClassName: false,
 
});

  document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
       const el = mutation.target;
      if (
        mutation.attributeName === "class" &&
        el.classList.contains("aos-animate")
      ) {
      if (el.id === "progress") {
        document.querySelectorAll(".progress-bar").forEach((bar) => {
          const targetWidth = bar.getAttribute("data-width");
          bar.style.width = targetWidth;
        });
      }
      if (el.id === "academics") {
       document.querySelector(".line").classList.add("line-animate");
       document.querySelector(".line1").classList.add("line1-animate");
       document.querySelector(".line2").classList.add("line2-animate");

      }
    }
        }
      })

  observer.observe(progress, { attributes: true });
});

 

document.querySelectorAll('.image-box').forEach(box => {
  box.addEventListener('click', () => {
    // Remove 'touched' class from all boxes
    document.querySelectorAll('.image-box').forEach(b => {
      if (b !== box) {
      b.classList.remove('touched');
      b.style.setProperty('transform', 'translate(0, 0) scale(1)'); // Reset transform for other boxes
      }
    });
    // // Add 'touched' to clicked
    box.classList.toggle('touched');
   const rect= box.getBoundingClientRect();
    const centerx= rect.left + rect.width / 2;
    const centery= rect.top + rect.height / 2;
    const offsetX = window.innerWidth / 2 - centerx;
    const offsetY = window.innerHeight / 2 - centery;
    box.style.setProperty('transform', `translate(${offsetX}px, ${offsetY}px) scale(2)`);
    if(!box.classList.contains('touched')){
     box.style.transform=`translate(0, 0) scale(1)`;
    }
  });
  document.addEventListener('click', (e) => {
    if (!box.contains(e.target)) {
       box.style.transform=`translate(0, 0) scale(1)`;
      box.classList.remove('touched');
    }
  });
});

document.querySelectorAll('.form-item input, .form-item textarea').forEach(input => {
    const label = input.parentElement.querySelector('label');
  
    input.addEventListener('focus', () => {
      label.style.top = '-10px';
      label.style.color = 'black';
    });
  
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        if (input.tagName.toLowerCase() === 'textarea') {
          label.style.top = '75%';
        } else {
          label.style.top = '50%';
        }
        label.style.color = 'grey';
      }
    });
  });
  
  document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    API_URL = 'https://vercel-email-api-chi.vercel.app/api/sendEmail'; // Adjust the path as needed
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(async (res) => {
  const result = await res.json();
   const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = result.message;
  statusMessage.style.background = 'green';
  statusMessage.style.display = 'block';
    setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 4000);
}).catch(err => {
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = "Failed to send request";
  statusMessage.style.background = 'red';
  statusMessage.style.display = 'block';

  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 4000);
});
  });
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');}
);
  
