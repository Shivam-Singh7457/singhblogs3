import adbaner from '../../../assets/adbanner.jpg'
export default function AdBanner({ src = adbaner, alt = "Advertisement" }) {
  return (
    <div className="w-full flex justify-center px-4 my-10">
      <div className="w-full max-w-4xl border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          style={{ maxHeight: '250px' }}
        />
      </div>
    </div>
  );
}
