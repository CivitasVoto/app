<template>
  <!-- eslint-disable -->
  <!-- <div class="row text-center full-width"> -->
  <section class="row items-start justify-center full-width text-center q-col-gutter-md">
    <div class="col-12 col-md-4 column">
      <div class="bg-white rounded-borders q-my-md q-pa-md">
        Postal Address:
        <b>123 4th St, NY, NY 10001</b>
      </div>
      <TradeWidget />
    </div>

    <div class="col-12 col-md-7 justify-center">
      <div class="bg-white rounded-borders full-width text-left q-my-md q-pa-md">
        <div class="text-h6 text-grey-8 q-pb-md">Total Tennis</div>

        <p>
          Membership Price:
          <b>$500</b>
        </p>
        <p>
          Token Price:
          <b>$24.701234</b>
        </p>

        <p>
          <b size="lg">24/7 Tennis Court Access</b>
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quam quis aut nam atque dolores beatae harum magnam voluptate. Incidunt id vel quasi dolores qui ex, tempore odio veniam possimus.</p>
        <p>Ullam quas vel animi voluptatem, saepe sint odit consequuntur est, rem perspiciatis ratione nostrum ea, facere et? Numquam quasi commodi reprehenderit velit perferendis quo ipsam maiores voluptates architecto. Nulla, nostrum!</p>
        <p>Asperiores, omnis quod? Aliquid officia vel, ratione at totam est maiores hic distinctio qui explicabo doloremque perferendis corporis, labore doloribus tempore ipsam? Magni libero cupiditate voluptatem alias at a perferendis?</p>
        <p>Tempora illum alias iusto ea fuga eum, possimus distinctio beatae, laudantium ducimus dolorem rerum porro facilis earum. Laudantium doloribus officiis possimus a tempore aperiam voluptas dicta impedit molestiae? Consequatur, esse.</p>
      </div>
      <div class="lorem"></div>
    </div>
  </section>
  <!-- </div> -->
</template>

<script>
import TradeWidget from "src/components/global/TradeWidget";
export default {
  components: {
    TradeWidget
  },
  data() {
    return {
      n: 1
    };
  }
};
</script>
