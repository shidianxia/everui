<template>
    <div>
        <p><xbadge :value="12" class="item"></xbadge></p>
        <p><xbadge :value="3" class="item"></xbadge></p>
        <p><xbadge :value="10000" :max="999" class="item"></xbadge></p>
        <p><xbadge value="new" class="item"></xbadge></p>
        <p><xbadge is-dot class="item" dotcolor="#2088EC"></xbadge></p>
        <p><xbadge is-dot class="item" dotcolor="#5ABA69"></xbadge></p>
        <p><xbadge is-dot class="item" dotcolor="#EFB444"></xbadge></p>
        <p><xbadge is-dot class="item"></xbadge></p>
    </div>
</template>

<style>
p{
    margin-left: 20px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>