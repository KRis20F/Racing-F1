import { Fragment } from 'react';

const SmokeEffect = () => {
  return (
    <Fragment>
      {/* Humo principal rueda trasera */}
      <div className="smoke-container main-smoke">
        <div className="smoke-particle smoke-1" />
        <div className="smoke-particle smoke-2" />
        <div className="smoke-particle smoke-3" />
        <div className="smoke-particle smoke-4" />
      </div>

      {/* Humo secundario rueda trasera */}
      <div className="smoke-container secondary-smoke">
        <div className="smoke-particle smoke-5" />
        <div className="smoke-particle smoke-6" />
        <div className="smoke-particle smoke-7" />
      </div>

      {/* Humo disperso izquierda */}
      <div className="smoke-container left-smoke">
        <div className="smoke-particle smoke-8" />
        <div className="smoke-particle smoke-9" />
        <div className="smoke-particle smoke-10" />
      </div>

      {/* Humo disperso derecha */}
      <div className="smoke-container right-smoke">
        <div className="smoke-particle smoke-11" />
        <div className="smoke-particle smoke-12" />
        <div className="smoke-particle smoke-13" />
      </div>

      {/* Humo de fondo */}
      <div className="smoke-container background-smoke">
        <div className="smoke-particle smoke-14" />
        <div className="smoke-particle smoke-15" />
        <div className="smoke-particle smoke-16" />
      </div>
    </Fragment>
  );
};

export default SmokeEffect; 