document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in classes to elements for Intersection Observer
    const sections = document.querySelectorAll('section > h2, .matrix-card, .service-card, .feature-item, .gallery-item, .pricing-card');
    sections.forEach(sec => {
        sec.classList.add('fade-in');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        observer.observe(sec);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    // 이 URL은 구글 앱스 스크립트 배포 후 발급받은 웹 앱 URL로 대체해야 합니다.
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxL_2lNK_sIir32yXoyTV-hZR7TG8B33L1mkX3IRo0lN93Nbj4qxsnMuNCdANKQJ_Wz/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formStatus.textContent = '전송 중...';
            formStatus.className = 'form-status';

            const formData = new FormData(contactForm);
            
            // URLSearchParams converts FormData to application/x-www-form-urlencoded
            const searchParams = new URLSearchParams();
            for (const pair of formData) {
                searchParams.append(pair[0], pair[1]);
            }

            if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                setTimeout(() => {
                    formStatus.textContent = '[데모 모드] 문의가 임시 접수되었습니다. (구글 앱스 스크립트 URL 설정 필요)';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                }, 1000);
                return;
            }

            fetch(SCRIPT_URL, {
                method: 'POST',
                body: searchParams,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    formStatus.textContent = '문의가 성공적으로 접수되었습니다!';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    formStatus.textContent = '오류가 발생했습니다. 다시 시도해 주세요.';
                    formStatus.className = 'form-status error';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = '네트워크 오류가 발생했습니다.';
                formStatus.className = 'form-status error';
            });
        });
    }
});
