<script lang="ts">
  export let lang: string = 'en';

  // Form labels
  const nameLabel = lang === 'en' ? 'Name *' : 'Nombre *';
  const emailLabel = lang === 'en' ? 'Email *' : 'Email *';
  const phoneLabel = lang === 'en' ? 'Phone (optional)' : 'Teléfono (opcional)';
  const messageLabel = lang === 'en' ? 'Message *' : 'Mensaje *';
  const submitButtonText = lang === 'en' ? 'Send message' : 'Enviar mensaje';

  // Form values
  let nameValue: string = '';
  let emailValue: string = '';
  let phoneValue: string = '';
  let messageValue: string = '';

  // Form config
  let isSuccess: boolean = false;
  let isLoading: boolean = false;

  // Google form config
  const FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSdbGSa1AyQvgHGL7WE34ZbTzfukG9oOiLL3tlRFCjULr76sKA/formResponse';
  const FORM_ENTRIES = {
    name: 'entry.1008715654',
    email: 'entry.903587259',
    phone: 'entry.677814908',
    message: 'entry.110815800',
  };

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;

    console.log('----- handle submit -----');
    console.log(nameValue, emailValue, phoneValue, messageValue);
    try {
      const formData = new FormData();
      formData.append(FORM_ENTRIES.name, nameValue);
      formData.append(FORM_ENTRIES.email, emailValue);
      formData.append(FORM_ENTRIES.phone, phoneValue);
      formData.append(FORM_ENTRIES.message, messageValue);

      // Register event on google analytics
      // analytics.capture('confirmation_submitted', {
      //   inviteCode: invite.code,
      //   partyAttendance,
      //   stayAttendance,
      //   hasMessage: message.trim().length > 0,
      // });

      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: new URLSearchParams(formData as any),
      });

      isSuccess = true;
    } catch (error) {
      console.error('Form error:', error);
    } finally {
      isLoading = false;
    }
  }

  function resetForm() {
    nameValue = '';
    emailValue = '';
    phoneValue = '';
    messageValue = '';
    isSuccess = false;
  }

  console.log(isLoading);
</script>

{#if isSuccess}
  <div class="bg-grey-light shadow-lg p-8 rounded-lg flex flex-col items-center animate-fade-in text-center">
    <div class="mb-4">
      <!-- Neutral Checkmark Icon -->
      <svg class="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="#fffcf0" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 13l3 3 7-7" />
      </svg>
    </div>
    <p class="text-gray-900 text-2xl font-bold mb-2">
      {lang === 'en' ? 'Thank you for your message!' : '¡Gracias por tu mensaje!'}
    </p>
    <p class="text-gray-700 mb-6">
      {lang === 'en'
        ? 'Your message has been received. I appreciate your interest.'
        : 'Tu mensaje ha sido recibido. Aprecio tu interés.'}
    </p>
    <button
      class="bg-black text-white font-semibold py-2 px-6 rounded hover:bg-grey-light-900 transition"
      on:click={resetForm}
    >
      {lang === 'en' ? 'Send another message' : 'Enviar otro mensaje'}
    </button>
  </div>
{:else}
  <form on:submit={handleSubmit} class="bg-white shadow-lg p-4 space-y-3">
    <div>
      <label class="block text-sm font-medium mb-1" for="name">{nameLabel}</label>
      <input
        type="text"
        id="name"
        name="name"
        bind:value={nameValue}
        required
        autocomplete="off"
        minlength="3"
        class="w-full border bg-grey-light border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1" for="email">{emailLabel}</label>
      <input
        type="email"
        id="email"
        name="email"
        bind:value={emailValue}
        required
        autocomplete="off"
        minlength="3"
        class="w-full border bg-grey-light border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1" for="phone">{phoneLabel}</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        bind:value={phoneValue}
        autocomplete="off"
        minlength="3"
        class="w-full border bg-grey-light border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1" for="message">{messageLabel}</label>
      <textarea
        id="message"
        name="message"
        rows="3"
        bind:value={messageValue}
        required
        autocomplete="off"
        minlength="3"
        class="w-full border bg-grey-light border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      ></textarea>
    </div>
    <button
      type="submit"
      class="w-full bg-black text-white font-semibold py-2 rounded hover:bg-grey-light-900 transition flex items-center justify-center {isLoading
        ? 'opacity-60 cursor-not-allowed'
        : ''}"
      disabled={isLoading}
    >
      {#if isLoading}
        {lang === 'en' ? 'Sending...' : 'Enviando...'}
        <svg
          class="animate-spin h-5 w-5 ml-3 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      {:else}
        {submitButtonText}
      {/if}
    </button>
  </form>
{/if}
