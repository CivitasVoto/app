<template>
  <!-- eslint-disable -->
  <div>
    <template>
      <div class="q-pa-sm">
        <q-table title="Communities Joined" :data="data" :columns="columns" row-key="name" />
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
          name: "benefit",
          align: "left",
          label: "Benefit",
          field: "benefit",
          sortable: true
        },
        {
          name: "renewalDate",
          label: "Renewal Date",
          field: "renewalDate",
          sortable: true
        },
        { name: "renewalPrice", label: "Renewal Price", field: "renewalPrice" }
      ],
      data: [
        {
          name: "Total Tennis",
          benefit: "24/7 Tennis Access",
          renewalDate: "1/1/20",
          renewalPrice: "500.00"
        },
        {
          name: "Wet 'n Wild",
          benefit: "24/7 Waterpark Access",
          renewalDate: "1/21/20",
          renewalPrice: "300.00"
        }
      ]
    };
  }
};
</script>
