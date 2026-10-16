const officeObjects = {
  daruma: {
    src: '/images/objects/daruma.webp',
    alt: 'だるま',
    className: 'absolute bottom-1/4 right-1/4 z-20 h-16 w-16 object-contain',
  },
}

export function OfficeView({
  season = 'spring',
  timeOfDay = 'day',
  activeObjects = [],
  mood = 'normal',
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-900">
      <img
        src={`/images/scenery/${season}_${timeOfDay}.webp`}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <img
        src="/images/office_base.webp"
        alt=""
        className="absolute inset-0 z-10 h-full w-full object-cover"
      />
      {activeObjects.map((object) => {
        const officeObject = officeObjects[object]
        if (!officeObject) return null

        return (
          <img
            key={object}
            src={officeObject.src}
            alt={officeObject.alt}
            className={officeObject.className}
          />
        )
      })}
      {mood === 'crisis' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 mix-blend-multiply bg-red-950/30"
        />
      )}
    </div>
  )
}

export default OfficeView
