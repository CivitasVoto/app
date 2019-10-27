<template>
  <!-- eslint-disable -->
  <div>
    <template>
      <div class="q-pa-sm">
        <q-table title="Tokens Held" :data="data" :columns="columns" row-key="name" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "amountHeld",
          label: "Amount Held",
          field: "amountHeld",
          sortable: true
        },
        {
          name: "value",
          label: "Value",
          field: "value",
          sortable: true
        }
      ],
      data: [
        {
          name: "Balls",
          amountHeld: "2",
          value: "84.27"
        },
        {
          name: "Waves",
          amountHeld: "10",
          value: "48.72"
        }
      ]
    };
  }
};
</script>
