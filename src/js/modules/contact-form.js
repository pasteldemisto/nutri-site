const formSelector = '[data-contact-form]';
const statusSelector = '[data-contact-form-status]';
const consentSelector = '[data-contact-consent]';

function setFieldState(field, isValid) {
  const invalidState = !isValid;
  field.classList.toggle('is-invalid', invalidState);
  field.setAttribute('aria-invalid', String(invalidState));
}

function setConsentState(checkbox, isValid) {
  checkbox.classList.toggle('is-invalid', !isValid);
  checkbox.setAttribute('aria-invalid', String(!isValid));
}

function setFormStatus(form, message, isError = false) {
  const statusElement = form.querySelector(statusSelector);

  if (!statusElement) {
    return;
  }

  statusElement.textContent = message;
  statusElement.classList.toggle('is-error', isError);
}

export function initContactForm() {
  const form = document.querySelector(formSelector);

  if (!form) {
    return;
  }

  const fields = Array.from(form.querySelectorAll('input:not([type="checkbox"]), textarea'));
  const consentCheckbox = form.querySelector(consentSelector);

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      const isValid = field.checkValidity() && field.value.trim().length > 0;
      setFieldState(field, isValid);

      if (isValid) {
        setFormStatus(form, '', false);
      }
    });
  });

  if (consentCheckbox) {
    consentCheckbox.addEventListener('change', () => {
      setConsentState(consentCheckbox, consentCheckbox.checked);
    });
  }

  form.addEventListener('submit', (event) => {
    let hasError = false;

    fields.forEach((field) => {
      const isValid = field.checkValidity() && field.value.trim().length > 0;
      setFieldState(field, isValid);

      if (!isValid) {
        hasError = true;
      }
    });

    if (consentCheckbox && !consentCheckbox.checked) {
      hasError = true;
      setConsentState(consentCheckbox, false);
    }

    if (hasError) {
      event.preventDefault();
      setFormStatus(form, 'Revise os campos e confirme o consentimento antes de enviar.', true);
      return;
    }

    setFormStatus(form, 'Sua mensagem está pronta para envio.', false);
  });
}
