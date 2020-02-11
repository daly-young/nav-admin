<template>
	<div class="layout">
		<Layout>
			<Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
				<Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
					<MenuItem name="1-1" >
					<Icon type="ios-navigate"></Icon>
					<span>私有</span>
					</MenuItem>
					<MenuItem name="1-2">
					<Icon type="search"></Icon>
					<span>公有</span>
					</MenuItem>
				</Menu>
				<div slot="trigger"></div>
			</Sider>
			<Layout>
				<Header class="layout-header-bar">
					<Row type="flex" justify="end" class="code-row-bg">
						<Col span="4"></Col>
						<Col span="4"></Col>
						<Col span="4">
						<!--<Button type="info">Info</Button>-->
						</Col>
						<Col span="4">
						<Button type="success">添加</Button>
						</Col>
					</Row>
				</Header>
				<Content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
					<Table border :columns="columns7" :data="data6"></Table>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isCollapsed: false,
				columns7: [{
						title: '名称',
						key: 'name'
					},
					{
						title: 'url',
						key: 'url'
					},
					{
						title: 'Action',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {

							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, 'edit'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								}, 'Delete')
							]);
						}
					}
				],
				data6: [{
						name: 'vuejs',
						url: 'https://vuejs.org'
					},
					{
						name: 'vuejs',
						url: 'https://vuejs.org'
					},
					{
						name: 'vuejs',
						url: 'https://vuejs.org'
					},
					{
						name: 'vuejs',
						url: 'https://vuejs.org'
					},
				]
			};
		},
		computed: {
			menuitemClasses: function() {
				return [
					'menu-item',
					this.isCollapsed ? 'collapsed-menu' : ''
				]
			}
		},
		methods: {
			remove: function(a) {
				alert(a);
			}
		}

	}
</script>

<style scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}
	
	.layout-header-bar {
		background: #fff;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
	}
	
	.menu-item span {
		display: inline-block;
		overflow: hidden;
		width: 69px;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: bottom;
		transition: width .2s ease .2s;
	}
	
	.menu-item i {
		transform: translateX(0px);
		transition: font-size .2s ease, transform .2s ease;
		vertical-align: middle;
		font-size: 16px;
	}
	
	.collapsed-menu span {
		width: 0px;
		transition: width .2s ease;
	}
	
	.collapsed-menu i {
		transform: translateX(5px);
		transition: font-size .2s ease .2s, transform .2s ease .2s;
		vertical-align: middle;
		font-size: 22px;
	}
	
	.ivu-layout-content {
		height: 800px;
	}
</style>