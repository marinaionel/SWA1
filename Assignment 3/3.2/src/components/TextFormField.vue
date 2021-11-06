<template>
  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="{{name}}"
    >
      {{ label }}
    </label>
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      name="{{name}}"
      type="text"
      placeholder="{{placeholder}}"
    />
  </div>
</template>

<script>
export default {
  name: "TextFormField",
  props: {
    name: String,
    placeholder: String,
    label: String,
  },
};
</script>

<style></style>
