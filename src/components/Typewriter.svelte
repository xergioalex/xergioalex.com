<script lang="ts">
export let words: string[] = [];
export let speed = 80; // ms por letra
export let pause = 1500; // ms entre palabras

let display = '';
let index = 0;
let char = 0;
let typing = true;

async function typeLoop() {
  while (true) {
    const word = words[index];
    if (typing) {
      if (char < word.length) {
        display = word.slice(0, char + 1);
        char++;
        await new Promise(r => setTimeout(r, speed));
      } else {
        typing = false;
        await new Promise(r => setTimeout(r, pause));
      }
    } else {
      if (char > 0) {
        display = word.slice(0, char - 1);
        char--;
        await new Promise(r => setTimeout(r, speed / 2));
      } else {
        typing = true;
        index = (index + 1) % words.length;
      }
    }
  }
}

typeLoop();
</script>

<span class="whitespace-nowrap border-r-2 border-blue-400 pr-1 animate-pulse text-white font-bold text-xl md:text-2xl drop-shadow-lg">{display}</span> 