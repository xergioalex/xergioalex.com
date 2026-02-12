<script lang="ts">
export let words: string[] = [];
export let speed = 80; // ms per character
export let pause = 1500; // ms between words

let display = '';
let index = 0;
let char = 0;
let typing = true;

async function typeLoop() {
  // Verify that words has content before starting
  if (!words || words.length === 0) {
    return;
  }

  while (true) {
    const word = words[index];
    if (!word) {
      index = 0;
      continue;
    }

    if (typing) {
      if (char < word.length) {
        display = word.slice(0, char + 1);
        char++;
        await new Promise((r) => setTimeout(r, speed));
      } else {
        typing = false;
        await new Promise((r) => setTimeout(r, pause));
      }
    } else {
      if (char > 0) {
        display = word.slice(0, char - 1);
        char--;
        await new Promise((r) => setTimeout(r, speed / 2));
      } else {
        typing = true;
        index = (index + 1) % words.length;
      }
    }
  }
}

// Only run typeLoop if words has content
if (words && words.length > 0) {
  typeLoop();
}
</script>

<span
  class="whitespace-nowrap border-r-2 border-blue-400 pr-1 animate-pulse text-white font-bold text-lg sm:text-xl md:text-2xl [@media(max-height:760px)]:text-base drop-shadow-lg"
>
  {display}
</span> 