const Router = require('koa-router')
const sharp = require('sharp')

const svg = `    <svg style={styles} viewBox="0 0 120 17">
<defs>
	<mask id="xxx">
		<circle cx="7" cy="12" r="40" fill="#fff" />
	</mask>

	<filter id="goo">
		<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
		<feColorMatrix
			in="blur"
			mode="matrix"
			values="
		 1 0 0 0 0
		 0 1 0 0 0
		 0 0 1 0 0
		 0 0 0 13 -9"
			result="goo"
		/>
		<feBlend in="SourceGraphic" in2="goo" />
	</filter>
	<path
		id="wave"
		d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
	/>
</defs>

<use id="wave3" fill={fillColor} className="wave" xlinkHref="#wave" x="0" y="-2"></use>
<use id="wave2" fill={fillColor} className="wave" xlinkHref="#wave" x="0" y="0"></use>

<g className="topball">
	{/* <circle className="ball" cx="110" cy="8" r="4" stroke="none" stroke-width="0" fill="red" /> */}

	{/* <g className="arrow">
		<polyline className="" points="108,8 110,6 112,8" fill="none" />
		<polyline className="" points="110,6 110,10.5" fill="none" />
	</g> */}
</g>
<g className="gooeff">
	{/* <circle className="drop drop1" cx="20" cy="2" r="1.8" />
	<circle className="drop drop2" cx="25" cy="2.5" r="1.5" />
	<circle className="drop drop3" cx="16" cy="2.8" r="1.2" /> */}
	<use id="wave1" fill={fillColor} className="wave" xlinkHref="#wave" x="0" y="1" />

	<path
		id="wave1"
		className="wave"
		fill={fillColor}
		d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
	/>
</g>
</svg>`

const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);




const router = new Router()

router.get('/',async (ctx)=>{
	const semiTransparentRedPng = await sharp({
		create: {
			width: 48,
			height: 48,
			channels: 4,
			background: { r: 255, g: 0, b: 0, alpha: 0.5 }
		}
	}).png().toBuffer()
	ctx.state.roundedCornerResizer = semiTransparentRedPng
	await ctx.render('index')
})
router.get('/click',(ctx,next)=>{
	ctx.body={a:'123'}
})
router.get('/contact',async (ctx)=>{
	console.log('first')
	ctx.state = {options:['1','2','3']}
	await ctx.render('option')
})

module.exports = router