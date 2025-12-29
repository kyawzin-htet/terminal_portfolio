export type ThemeName =
    | 'dark'
    | 'light'
    | 'blue-matrix'
    | 'espresso'
    | 'green-goblin'
    | 'ubuntu'
    | 'dracula'
    | 'monokai'
    | 'nord'
    | 'solarized-dark'
    | 'glass';

export interface TerminalTheme {
    name: ThemeName;
    displayName: string;
    colors: {
        background: string;
        foreground: string;
        border: string;
        titleBar: string;
        titleText: string;
        prompt: string;
        command: string;
        output: string;
        accent: string;
        scrollbarThumb: string;
        scrollbarTrack: string;
    };
}

export const themes: Record<ThemeName, TerminalTheme> = {
    'dark': {
        name: 'dark',
        displayName: 'Dark',
        colors: {
            background: '#0f172a',
            foreground: '#e2e8f0',
            border: '#1e293b',
            titleBar: '#1e293b',
            titleText: '#94a3b8',
            prompt: '#22c55e',
            command: '#ffffff',
            output: '#06b6d4',
            accent: '#22c55e',
            scrollbarThumb: '#334155',
            scrollbarTrack: '#0f172a',
        },
    },
    'light': {
        name: 'light',
        displayName: 'Light',
        colors: {
            background: '#ffffff',
            foreground: '#1e293b',
            border: '#e2e8f0',
            titleBar: '#f1f5f9',
            titleText: '#64748b',
            prompt: '#059669',
            command: '#0f172a',
            output: '#0891b2',
            accent: '#059669',
            scrollbarThumb: '#cbd5e1',
            scrollbarTrack: '#f8fafc',
        },
    },
    'blue-matrix': {
        name: 'blue-matrix',
        displayName: 'Blue Matrix',
        colors: {
            background: '#000814',
            foreground: '#00d9ff',
            border: '#001d3d',
            titleBar: '#001233',
            titleText: '#0096c7',
            prompt: '#00d9ff',
            command: '#48cae4',
            output: '#90e0ef',
            accent: '#00d9ff',
            scrollbarThumb: '#023e8a',
            scrollbarTrack: '#000814',
        },
    },
    'espresso': {
        name: 'espresso',
        displayName: 'Espresso',
        colors: {
            background: '#2d2006',
            foreground: '#f4d9c6',
            border: '#43301a',
            titleBar: '#3d2817',
            titleText: '#d4a574',
            prompt: '#f9ae58',
            command: '#ffd89b',
            output: '#d4a574',
            accent: '#f9ae58',
            scrollbarThumb: '#6b4423',
            scrollbarTrack: '#2d2006',
        },
    },
    'green-goblin': {
        name: 'green-goblin',
        displayName: 'Green Goblin',
        colors: {
            background: '#0d1b0d',
            foreground: '#00ff41',
            border: '#1a331a',
            titleBar: '#152615',
            titleText: '#00cc33',
            prompt: '#00ff41',
            command: '#39ff14',
            output: '#7fff00',
            accent: '#00ff41',
            scrollbarThumb: '#2d5f2d',
            scrollbarTrack: '#0d1b0d',
        },
    },
    'ubuntu': {
        name: 'ubuntu',
        displayName: 'Ubuntu',
        colors: {
            background: '#300a24',
            foreground: '#ffffff',
            border: '#5e2750',
            titleBar: '#2c001e',
            titleText: '#dd4814',
            prompt: '#dd4814',
            command: '#ffffff',
            output: '#aea79f',
            accent: '#dd4814',
            scrollbarThumb: '#772953',
            scrollbarTrack: '#300a24',
        },
    },
    'dracula': {
        name: 'dracula',
        displayName: 'Dracula',
        colors: {
            background: '#282a36',
            foreground: '#f8f8f2',
            border: '#44475a',
            titleBar: '#21222c',
            titleText: '#bd93f9',
            prompt: '#50fa7b',
            command: '#f1fa8c',
            output: '#8be9fd',
            accent: '#ff79c6',
            scrollbarThumb: '#6272a4',
            scrollbarTrack: '#282a36',
        },
    },
    'monokai': {
        name: 'monokai',
        displayName: 'Monokai',
        colors: {
            background: '#272822',
            foreground: '#f8f8f2',
            border: '#3e3d32',
            titleBar: '#1e1f1c',
            titleText: '#75715e',
            prompt: '#a6e22e',
            command: '#f92672',
            output: '#66d9ef',
            accent: '#fd971f',
            scrollbarThumb: '#49483e',
            scrollbarTrack: '#272822',
        },
    },
    'nord': {
        name: 'nord',
        displayName: 'Nord',
        colors: {
            background: '#2e3440',
            foreground: '#d8dee9',
            border: '#3b4252',
            titleBar: '#2e3440',
            titleText: '#88c0d0',
            prompt: '#88c0d0',
            command: '#eceff4',
            output: '#81a1c1',
            accent: '#5e81ac',
            scrollbarThumb: '#4c566a',
            scrollbarTrack: '#2e3440',
        },
    },
    'solarized-dark': {
        name: 'solarized-dark',
        displayName: 'Solarized Dark',
        colors: {
            background: '#002b36',
            foreground: '#839496',
            border: '#073642',
            titleBar: '#073642',
            titleText: '#586e75',
            prompt: '#859900',
            command: '#93a1a1',
            output: '#2aa198',
            accent: '#268bd2',
            scrollbarThumb: '#586e75',
            scrollbarTrack: '#002b36',
        },
    },
    'glass': {
        name: 'glass',
        displayName: 'VisionOS Glass',
        colors: {
            background: 'rgba(0, 0, 0, 0.3)', // Darker, more transparent feel
            foreground: '#ffffff',
            border: 'rgba(255, 255, 255, 0.15)', // 15% white opacity
            titleBar: 'transparent',
            titleText: 'rgba(255, 255, 255, 0.9)',
            prompt: '#3b82f6', // SF Blue
            command: '#ffffff',
            output: 'rgba(255, 255, 255, 0.85)',
            accent: '#3b82f6',
            scrollbarThumb: 'rgba(255, 255, 255, 0.2)',
            scrollbarTrack: 'transparent',
        },
    },
};

export const getTheme = (themeName: ThemeName): TerminalTheme => {
    return themes[themeName];
};

export const getAllThemeNames = (): ThemeName[] => {
    return Object.keys(themes) as ThemeName[];
};
