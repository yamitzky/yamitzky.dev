<template>
  <div id="yakiniku">
    <nuxt/>
  </div>
</template>

<style>
$link-color:         #005e7c;
$link-hover-color:   #009ce0;

$background-color: #EAEBED;

$font-color: #0e2a3d;
$font-family: sans-serif;
$base-font-size:   12px;
$base-line-height: 18px;

$total-cols: 12;
$col-width: 4em;
$gutter-width: 1em;
$side-gutter-width: $gutter-width;

body {
  font-family: $font-family;
  color: $font-color;
  background-color: $font-color;
}

a {
  color: $link-color;
  &:hover {
    color: $link-hover-color;
  }
}

p, li, h1, h2, h3, h4, h5, h6 {
  line-height: 1.5em;
}

ul {
  margin: 0;
}

li {
  list-style-type: thai;
}

h2 {
  margin: 32px 0 0;
}

#main {
  padding: 32px;
}

#yakiniku {
  background-color: #EAEBED;
  color: $font-color;
  margin: 64px auto;
  padding: 32px;
}
</style>
