/**
 * ==========================================================================
 * NovaTech Landing Page - JavaScript Functionality
 * 
 * 1. მობილური მენიუს მართვა (Hamburger Menu Open/Close)
 * 2. ჰედერის ვიზუალური ეფექტი სქროლზე (Sticky Glass Header)
 * 3. აქტიური ბმულის ავტომატური გამოკვეთა სქროლისას (Scrollspy)
 * 4. კონტაქტის ფორმის ვალიდაცია და გაგზავნის იმიტაცია (Form Submit Simulation)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. ელემენტების შერჩევა (DOM Elements)
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formFeedback = document.getElementById('formFeedback');

  // ინფუთები და მათი შესაბამისი ერორ კონტეინერები
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // მობილური მენიუს ფონის დაბნელება (Backdrop)
  let menuBackdrop = document.querySelector('.menu-backdrop');
  if (!menuBackdrop) {
    menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    document.body.appendChild(menuBackdrop);
  }

  // --------------------------------------------------------------------------
  // 2. მობილური მენიუს მართვა (Mobile Navigation Toggle)
  // --------------------------------------------------------------------------

  /**
   * მენიუს გახსნის ფუნქცია
   */
  const openMenu = () => {
    menuToggle.classList.add('active');
    navMenu.classList.add('open');
    menuBackdrop.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // ფონის სქროლის დაბლოკვა
  };

  /**
   * მენიუს დახურვის ფუნქცია
   */
  const closeMenu = () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
    menuBackdrop.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // ფონის სქროლის აღდგენა
  };

  /**
   * ჰამბურგერ ღილაკზე დაკლიკება
   */
  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // მენიუს დახურვა ბმულზე დაკლიკებისას
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // მენიუს დახურვა მენიუს გარეთ (ბექდროპზე) დაკლიკებისას
  menuBackdrop.addEventListener('click', closeMenu);

  // მენიუს დახურვა Escape ღილაკზე დაჭერისას (Accessibility)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // ეკრანის ზომის შეცვლისას (Resize) მობილური მენიუს გასუფთავება
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 3. ჰედერის სტილი სქროლზე (Sticky Blur Header)
  // --------------------------------------------------------------------------
  const handleHeaderScroll = () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // გვერდის ჩატვირთვისთანავე შემოწმება

  // --------------------------------------------------------------------------
  // 4. აქტიური სექციის გამოკვეთა ნავიგაციაში (Scrollspy)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120; // კომპენსაცია ჰედერის სიმაღლისთვის

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 5. კონტაქტის ფორმის ვალიდაცია და გაგზავნის იმიტაცია
  // --------------------------------------------------------------------------

  /**
   * ელ-ფოსტის სისწორის შემოწმება (Regex)
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
  };

  /**
   * შეცდომის ჩვენება კონკრეტულ ველზე
   */
  const showError = (inputEl, errorEl, message) => {
    inputEl.classList.add('invalid');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  };

  /**
   * შეცდომის გასუფთავება
   */
  const clearError = (inputEl, errorEl) => {
    inputEl.classList.remove('invalid');
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  };

  // ცოცხალი ვალიდაცია აკრეფისას (Real-time error clearing)
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        clearError(nameInput, nameError);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) {
        clearError(messageInput, messageError);
      }
    });
  }

  /**
   * ფორმის გაგზავნის დამუშავება
   */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // 1. სახელის შემოწმება
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        showError(nameInput, nameError, 'გთხოვთ, მიუთითოთ თქვენი სახელი');
        isValid = false;
      } else if (nameVal.length < 2) {
        showError(nameInput, nameError, 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს');
        isValid = false;
      } else {
        clearError(nameInput, nameError);
      }

      // 2. ელ-ფოსტის შემოწმება
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        showError(emailInput, emailError, 'გთხოვთ, მიუთითოთ ელექტრონული ფოსტა');
        isValid = false;
      } else if (!isValidEmail(emailVal)) {
        showError(emailInput, emailError, 'გთხოვთ, შეიყვანოთ სწორი ელ-ფოსტის ფორმატი (მაგ: info@domain.ge)');
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }

      // 3. შეტყობინების შემოწმება
      const messageVal = messageInput.value.trim();
      if (!messageVal) {
        showError(messageInput, messageError, 'გთხოვთ, ჩაწეროთ თქვენი შეტყობინება');
        isValid = false;
      } else if (messageVal.length < 10) {
        showError(messageInput, messageError, 'შეტყობინება უნდა შედგებოდეს მინიმუმ 10 სიმბოლოსგან');
        isValid = false;
      } else {
        clearError(messageInput, messageError);
      }

      // თუ ვალიდაცია ვერ გაიარა, შევაჩეროთ
      if (!isValid) {
        return;
      }

      // 4. გაგზავნის იმიტაცია (Loading State)
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      formFeedback.style.display = 'none';
      formFeedback.className = 'form-feedback';

      // ვასიმულირებთ ქსელურ მოთხოვნას (1.2 წამიანი დაყოვნებით)
      setTimeout(() => {
        // ღილაკის პირვანდელ მდგომარეობაში დაბრუნება
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // წარმატების შეტყობინების ჩვენება
        formFeedback.textContent = '🎉 მადლობა! თქვენი შეტყობინება წარმატებით გაიგზავნა. ჩვენი გუნდი მალე დაგიკავშირდებათ.';
        formFeedback.classList.add('success');
        formFeedback.style.display = 'block';

        // ფორმის ველების გასუფთავება
        contactForm.reset();

        // 6 წამის შემდეგ შეტყობინების ავტომატური გაქრობა
        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 6000);

      }, 1200);

    });
  }

});
