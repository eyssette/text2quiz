import sanitizeMarkdown from 'sanitize-markdown';

const allowewTagsDefault = [
	"a",
	"article",
	"b",
	"blockquote",
	"br",
	"caption",
	"code",
	"del",
	"details",
	"div",
	"em",
	"h1", "h2", "h3", "h4", "h5", "h6",
	"hr",
	"i",
	"img",
	"ins",
	"kbd",
	"li",
	"main",
	"ol",
	"p",
	"pre",
	"section",
	"span",
	"strike",
	"strong",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"th",
	"thead",
	"tr",
	"u",
	"ul"
]

const allowedTagsLatex = [
	"math",
	"annotation",
	"semantics",
	"mtext",
	"mn",
	"mo",
	"mi",
	"mspace",
	"mover",
	"munder",
	"munderover",
	"msup",
	"msub",
	"msubsup",
	"mfrac",
	"mroot",
	"msqrt",
	"mtable",
	"mtr",
	"mtd",
	"mlabeledtr",
	"mrow",
	"menclose",
	"mstyle",
	"mpadded",
	"mphantom",
	"mglyph",
	"svg",
	"line",
	"path",
	"iframe",
];

const allowedTagsArray = allowewTagsDefault.concat(allowedTagsLatex);


export default function sanitizeHTML(string) {
	return sanitizeMarkdown(string, {
		allowedTags: allowedTagsArray,
		allowedAttributes: {
			span: ['class', 'style', 'aria-hidden'],
			div: ['class', 'style'],
			p: ['class', 'style'],
			blockquote: ['class', 'style'],
			path: ['d'],
			svg: ['width','height','style','viewbox','preserveaspectratio'],
			iframe : ['src', 'width', 'height', 'style', 'scrolling', 'frameBorder', 'allow', 'title', 'allowfullscreen', 'type'],
		}/* ,
		parser: {
			lowerCaseAttributeNames: false,
		  } */
	})
}