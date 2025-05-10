<template>
  <span class="custom-icon" :style="{ backgroundImage: `url(${icons[icon]})` }"></span>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  const icons = {
    // search: `<g clip-path="url(#i1066581826__a)"><path fill="#BDBDBD" fill-rule="evenodd" d="M2 7a5 5 0 1 1 10 0A5 5 0 0 1 2 7m5-7a7 7 0 1 0 4.192 12.606l3.1 3.101a1 1 0 0 0 1.415-1.414l-3.1-3.1A7 7 0 0 0 7 0" clip-rule="evenodd"></path></g>`,
    // message: `<path fill="#000" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 3H4v14l4-4h12V5z"/><circle cx="21" cy="3" r="1" fill="#ff4444"/>`,
    liked: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARTSURBVHgB7ZvdUdtAEMfXxvBMB1EHuAPkCnAqIFQQPwDDW+CN4WMCFQAVBCqwqCBOBSgVxHnlM/9NZEZen+FWkk+nzP1mGHHrs3T66752VyYKBAKBQCAQCAQCgf+TwWAQ8R95SItqAoKsrqysfH5+fh60Wq3V3EcJ/q6Oj48vyQNqEWh7ezvG4ZsQRpI+PDz0zs7OUqoR5wLxUOp0Ot/fEWdC7SK1yTHLy8tDS3GYCPUvqEac9iAeWhBnKMzjl5eXcz7ir4vPN+X38Hnv5OQkoRrokENMNw/45keTAkRMUe+L+N6A/k3eznE9xOJ8ATeeYrUa5W0Qa59mxVinmnAmECbnLg5R3oahc2OqC/utMNnOWZXjTCCsXLG0QYhr8hyXQ2xq/uHhVdfEq8GJQLz3gSDdvA29J6EG4EQg7GViaYNAV9QAXA0xubyPmzC8mIULlHnpsTDfUkNYuECm4QW8X70muBhiG9IAB7QxAlXmauzs7LAfFWHyndrUocz+V76cwDsfU0MoJVA+6IXiKm5+pk5enKxss3rNCIgHMCRLcA12gG/QU5OyoZLCAu3u7vYhzAX3GCnCWywtLSUW1UYGW0yWZA+qj/mP27l/f39/XrTXFgp34KKbaMQlKeHhheW9Z1MX17hD/YiqoXDgTT1J87JdRJyMG9uK7Xa7x+4IVQMH3oY8JZAS9RDjCxnMf4NeuKFrPKlxVi/GQUYDR2TJ4eFhure313t6eopx7k1SgHbEBjOL9BXHLdKcS1PZFBHkp8xPm2/ovbquIoPcUxA9GMjAW5E2qIYYTt6XNkzUW1KcuuEJmQNvaO+B/Ayi9RWn0gmEnrImLuZ1yCITSa5eG6RA24PkJvAHeY4hahCRAu0qFonyL/Ic3jRSCVQCyXwWns5P8hy0eU2YVIJZC4QlNzKYvfep2BcUZeutBmMt0OPjYzTz5XY7JY/JthpTvd7SF3ylVLgDS7zXPci0LbH0BV+xFohDGTTbgDvyGLR5XZRT7Z7NWiCT43h6eurtJF1VJkUjkHT0vB5eplAvBLN2lidYC4QJ+YO4WEp+M7NjRlwoISWaSXqqBzVggo5FuVCot/AkjfJv8hTT8k6KWFQea4HQY+QFU/IU0/IOwRIqgKYHSTfD2yFmijrI95Csz2VTyeRmoEel5CGmTG6ZFyUK76TxlGp7qektsLzPRBGLLO8TrATi3accUrioKvDkAk5F4fApb+PhdXR0VDiTq5mD5BiOOf1DnsBt4TydtJvCrho0O+kDg+0SDRtQjfCSzllXbovBc0/L/qRBldXI0r+xtPPwM/QwbmxX2LhOVasfp7qjeS+lz8u2aFHlxRAq2EI3HkrHNWtkbHGKLlXIvJQ3i4M2fqwi26JaxfiCFWc8K4eXdG5j0X2PpFBunvdFiDDuz3lzvhZYGI4WVv0zqlK/1WChODWMfzcM4ZCFg2umEIVTT6OmvPMYCAQCgUAgEAgEAuAP4KfntCl8fsUAAAAASUVORK5CYII=`,
    player: `https://website-static-ali-01.233leyuan.com/v_11f1b05a-2f3b-4b12-b6f6-a0ca831786f4_1746695949720/play.Z89YX7O0.png`,
  };
  defineProps({
    icon: {
      type: String as PropType<keyof typeof icons>,
      required: true,
    },
  });
</script>
<style lang="scss" scoped>
  .custom-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    background-size: 100% 100%;
  }
</style>
