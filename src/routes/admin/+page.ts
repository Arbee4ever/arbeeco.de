import { browser } from '$app/environment';
import { Components } from '$lib/js/markdownComponents';

export const ssr = false;

export const load = async () => {
	if (!browser) return;
	const { default: CMS } = await import('@sveltia/cms');
	await CMS.init();

	const toPreview = (data: any) => {
		if (!data || Object.is(JSON.stringify(data), '{}')) return '';

		const componentType = data.type as keyof typeof Components;
		const componentConfig = Components[componentType];
		if (!componentConfig) return '';

		const element = document.createElement('div');
		const component = new componentConfig.component({
			target: element,
			props: data.value,
			hydrate: true
		});

		element.addEventListener('Unmount', () => component.$destroy(), { once: true });

		return element;
	};

	const fromBlock = (type: keyof typeof Components, match: RegExpMatchArray) => {
		const value = Components[type].transform(match[1]);
		const [key, val] = Object.entries(value)[0] ?? [];

		return {
			type,
			value,
			...(key ? { [key]: val } : {})
		};
	};

	const registerComponent = (
		type: string,
		config: typeof Components[string]
	) => {
		CMS.registerEditorComponent({
			id: type,
			label: config.label,
			icon: config.icon,
			fields: config.fields,
			pattern: config.pattern,
			fromBlock: (match) => fromBlock(type, match),
			toBlock: config.markdown,
			toPreview
		});
	};

	Object.entries(Components).forEach((el) => {
		registerComponent(...el);
	})

	/*import { getAuthor } from "/home/arbee/Projects/WebstormProjects/arbeeco.de/src/lib/js/collections.ts"
	CMS.registerEventListener({
		name: 'preSave',
		handler: async ({ entry }) => {
			console.log(entry);
			entry = new Map(entry);
			if (!entry.get('newRecord') && entry.get('collection') === 'posts') {
				const author = getAuthor(entry.get('data').get('authors').toArray()[0]);
				const body = {
					'content': "<@&953818178356670505>",
					'embeds': [
						{
							'title': entry.get('data').get('title'),
							'url': `https://arbeeco.de/blog/${entry.get('slug')}`,
							'color': null,
							'author': {
								'name': author.name,
								"url": author.url,
								"icon_url": `https://cdn.discordapp.com/avatars/391979592883372042/abafa5b855c4f4f9fb71bf990baaa197.png`
							},
							'image': {
								'url': `https://arbeeco.de/${entry.get('data').get('image').get('src')}`
							},
							"timestamp": entry.get('data').get('date')
						}
					],
					'attachments': []
				}
				console.log('body', JSON.stringify(body));
				await fetch('https://discord.com/api/webhooks/1451715058689380587/HYepnEO0eZMgKDvoR3gevwogAzo3S13MQKXh23508cBhtxSSvpGbpRawJQ9cvIcI5EcC', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body)
				});
			}
			return entry;
		}
	});*/

	/*const PostPreview = createClass({
		render: function() {
			const { entry, widgetFor, getAsset } = this.props;
			console.log('entry', entry.toJS());
			const image = entry.getIn(['data', 'image', 'src']);
			const imageAsset = image ? getAsset(image) : null;

			return h(
				'div',
				{},
				h('h1', {}, entry.getIn(['data', 'title'])),
				imageAsset &&
				h('img', {
					src: imageAsset.url,
					alt: 'Featured',
					style: { maxWidth: '100%', height: 'auto' }
				}),
				h('div', { style: { marginTop: '20px' } }, widgetFor('content'))
			);
		}
	});

	CMS.registerPreviewTemplate('posts', PostPreview);*/
};
