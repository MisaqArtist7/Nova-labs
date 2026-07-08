    document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Header scroll state ---------- */
    const header = document.getElementById('site-header');
    const onScroll = () => {
        if (window.scrollY > 12) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    let menuOpen = false;

    menuToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        menuToggle.classList.toggle('is-open', menuOpen);
        mobileMenu.style.maxHeight = menuOpen ? mobileMenu.scrollHeight + 'px' : '0px';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
        menuOpen = false;
        menuToggle.classList.remove('is-open');
        mobileMenu.style.maxHeight = '0px';
        });
    });

    /* ---------- Hero entrance ---------- */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (window.gsap && !reduceMotion) {
        gsap.to('.reveal', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15
        });
    } else {
        document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'none';
        });
    }

    /* ---------- Code editor typing effect ---------- */
    const codeLines = [
        `<span class="kw">const</span> <span class="fn">novaLabs</span> <span class="pn">=</span> <span class="pn">{</span>`,
        `&nbsp;&nbsp;<span class="fn">name</span><span class="pn">:</span> <span class="str">'نووا لبز'</span><span class="pn">,</span>`,
        `&nbsp;&nbsp;<span class="fn">mission</span><span class="pn">:</span> <span class="str">'انفجار مثل یک سوپر نووا'</span><span class="pn">,</span>`,
        `<span class="pn">}</span>`,
        ``,
        `<span class="cm">// شروع یک پروژه‌ی تازه</span>`,
        `<span class="fn">novaLabs</span><span class="pn">.</span><span class="fn">start</span><span class="pn">(</span><span class="str">'پروژه شما'</span><span class="pn">)</span>`
    ];

    const typer = document.getElementById('code-typer');

    function stripTags(html) {
        return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    }

    function typeLines() {
        if (!typer) return;
        typer.innerHTML = '';

        let lineIndex = 0;

        function typeNextLine() {
        if (lineIndex >= codeLines.length) {
            const cursor = document.createElement('span');
            cursor.className = 'code-cursor';
            typer.appendChild(cursor);
            return;
        }

        const raw = codeLines[lineIndex];
        const plain = stripTags(raw);
        const len = Math.max(plain.length, 1);

        const lineWrap = document.createElement('div');
        lineWrap.style.overflow = 'hidden';
        lineWrap.style.display = 'inline-block';
        lineWrap.style.maxWidth = '100%';
        lineWrap.style.width = '0ch';
        lineWrap.style.whiteSpace = 'pre';
        lineWrap.style.verticalAlign = 'top';
        lineWrap.innerHTML = raw === '' ? '&nbsp;' : raw;

        const row = document.createElement('div');
        row.appendChild(lineWrap);
        typer.appendChild(row);

        if (window.gsap && !reduceMotion) {
            gsap.to(lineWrap, {
            width: `${len}ch`,
            duration: Math.min(len * 0.035, 1.1),
            ease: `steps(${len})`,
            onComplete: () => {
                lineIndex++;
                typeNextLine();
            }
            });
        } else {
            lineWrap.style.width = `${len}ch`;
            lineIndex++;
            typeNextLine();
        }
        }

        typeNextLine();
    }

    if ('IntersectionObserver' in window && typer) {
        const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            typeLines();
            io.disconnect();
            }
        });
        }, { threshold: 0.3 });
        io.observe(typer);
    } else {
        typeLines();
    }
    });

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
        if (openItem !== item) {
            openItem.classList.remove('is-open');
            openItem.querySelector('.faq-answer').style.maxHeight = '0px';
        }
    });

    if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = '0px';
    } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
    });
});