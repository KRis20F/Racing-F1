interface CarModelConfig {
    scale: number;
    position: [number, number, number];
    rotation: [number, number, number];
    cameraPosition: [number, number, number];
    fov: number;
}

interface CarModelsConfig {
    [key: string]: CarModelConfig;
}

export const CAR_MODELS_CONFIG: CarModelsConfig = {
    // Muscle Cars
    'dodge_charger_1970_rt': {
        scale: 2,
        position: [0, -1, 0],
        rotation: [0, Math.PI / 4, 0],
        cameraPosition: [3, 2, 3],
        fov: 50
    },
    '1978_pontiac_firebird_formula': {
        scale: 1,
        position: [0, 0, 0],
        rotation: [0, Math.PI / 4, 0],
        cameraPosition: [3, 2, 3],
        fov: 50
    },

    // Formula Cars
    'formula_1_generico_modelo_exemplo': {
        scale: 2,
        position: [0, -0.3, 0],
        rotation: [0, Math.PI / 4, 0],
        cameraPosition: [3, 1.5, 3],
        fov: 48
    },

    // Sport Cars
    '2022_porsche_911_gt3_992': {
        scale: 100,
        position: [0, -0.35, 0],
        rotation: [0, Math.PI / 3, 0],
        cameraPosition: [3, 1.8, 3],
        fov: 50
    },
    'bmw_m3_e46_gtr': {
        scale: 40.0,
        position: [0, -1, 0],
        rotation: [0, Math.PI / 3, 0],
        cameraPosition: [3, 1, 5],
        fov: 60
    },

    // Supercars
    '2022_lamborghini_huracan_super_trofeo_evo2_carb': {
        scale: 110,
        position: [0, -0.4, 0],
        rotation: [0, Math.PI / 2, 0],
        cameraPosition: [3.5, 2, 3.5],
        fov: 55
    },
    '2011_mosler_super_gt': {
        scale: 100,
        position: [0, -0.38, 0],
        rotation: [0, Math.PI / 3, 0],
        cameraPosition: [3.2, 1.9, 3.2],
        fov: 52
    },

    // Default configuration for any unspecified models
    'default': {
        scale: 100,
        position: [0, 0, 0],
        rotation: [0, Math.PI / 4, 0],
        cameraPosition: [3, 2, 3],
        fov: 50
    }
}; 