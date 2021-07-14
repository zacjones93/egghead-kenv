let myArg = await arg("tab around", ["01", "02"]);

let lesson01 = () => {
  return show(`
  <div
    class="flex flex-column gap-4"
  >
  <iframe
    class="egghead-video"
    width="720"
    height="1280"
    src="https://egghead.io/lessons/react-use-a-recoil-atom-to-share-state-between-two-react-components/embed"
    title="wow"
    allowFullScreen
  />
  <hr/>
  <div class="bg-white text-black h-10 w-20">
    click Me
  </div>
<div>`);
};

let lesson02 = () => {
  return show(`<iframe
class="egghead-video"
width="1440"
height="2560"
src="https://egghead.io/lessons/react-use-a-recoil-atom-to-share-state-between-two-react-components/embed"
title="wow"
allowFullScreen
/>

<p>
<button>
  click Me
</button>
.
</p>`);
};

lesson01();

onTab("Lesson 01", lesson01);
onTab("Lesson 02", lesson02);
