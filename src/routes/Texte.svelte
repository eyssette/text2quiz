<script>
	export let content='';
	export let title=''
</script>

<div class="block">
	<div class="box block">
		<h2 class="title has-text-centered">{title}</h2>
		<div class="content">{@html content}</div>
	</div>
</div>