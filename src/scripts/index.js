/**
 * Define modules
 */
const deeplinker = require('@codexteam/deeplinker');
const markdown = require("./slimdown");

/**
 * Document ready function wrapper
 *
 * @param {function} f
 */
const docReady = (f) => {
  return /in/.test(document.readyState) ? window.setTimeout(docReady, 9, f) : f();
};

/**
 * Add listeners for form's elements
 */
const formListeners = () => {
  let checkBoxEl = document.querySelector('.custom-checkbox'),
      buttonEl = document.querySelector('.form-confirmation__button'),
      confirmationEl = document.querySelector('.form-confirmation__checkbox'),
      textarea = document.querySelector('.form__textarea'),
      preview = document.querySelector('.form__preview');

  checkBoxEl.addEventListener('click', function (event) {
    let el = this;

    el.classList.toggle('custom-checkbox--active');
    buttonEl.classList.toggle('form-confirmation__button--active');
    el.checked = el.classList.contains('custom-checkbox--active');

    preview.innerHTML = markdown.render(textarea.value);
  }, false);

  buttonEl.addEventListener('click', function (event) {
    if (!checkBoxEl.classList.contains('custom-checkbox--active')) {
      event.preventDefault();

      confirmationEl.classList.add('wobble');

      window.setTimeout(event => {
        confirmationEl.classList.remove('wobble');
      }, 500);
    }
  }, false);
};

/**
 * Check or a 'success' GET param
 */
const toggleScreenContent = () => {
  let url_string = window.location.href,
      url = new URL(url_string),
      messageWasSend = url.searchParams.get("success");

  if (messageWasSend) {
    document.getElementById('js-form').classList.add('dn');
    document.getElementById('js-success').classList.remove('dn');
  }
};

/**
 * Main script
 */
module.exports = (() => {

  /**
   * Initial function
   */
  const init = () => {
    toggleScreenContent();
    formListeners();
    deeplinker.init();

    console.info('Script is ready!');
  };

  /**
   * Start script when page is loaded
   */
  docReady(init);
})();
