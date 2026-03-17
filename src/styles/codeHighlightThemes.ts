import { CSSProperties } from 'react'

/**
 * Светлая тема в стиле GitHub
 */
export const githubLightStyle: { [key: string]: CSSProperties } = {
  hljs: {
    display: 'block',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    overflowX: 'auto' as any,
    padding: '1rem',
    color: '#24292e',
    background: '#f6f8fa',
  },
  'hljs-comment': {
    color: '#6a737d',
    fontStyle: 'italic',
  },
  'hljs-doctag': {
    color: '#d73a49',
  },
  'hljs-keyword': {
    color: '#d73a49',
    fontWeight: 'bold',
  },
  'hljs-built_in': {
    color: '#d73a49',
  },
  'hljs-type': {
    color: '#005cc5',
  },
  'hljs-literal': {
    color: '#005cc5',
  },
  'hljs-number': {
    color: '#005cc5',
  },
  'hljs-string': {
    color: '#032f62',
  },
  'hljs-regexp': {
    color: '#032f62',
  },
  'hljs-template-variable': {
    color: '#032f62',
  },
  'hljs-variable': {
    color: '#e36209',
  },
  'hljs-title': {
    color: '#6f42c1',
  },
  'hljs-params': {
    color: '#24292e',
  },
  'hljs-meta': {
    color: '#005cc5',
  },
  'hljs-meta-string': {
    color: '#032f62',
  },
  'hljs-section': {
    color: '#005cc5',
  },
  'hljs-selector-tag': {
    color: '#d73a49',
  },
  'hljs-selector-id': {
    color: '#005cc5',
  },
  'hljs-selector-class': {
    color: '#6f42c1',
  },
  'hljs-attr': {
    color: '#005cc5',
  },
  'hljs-attribute': {
    color: '#005cc5',
  },
  'hljs-symbol': {
    color: '#005cc5',
  },
  'hljs-bullet': {
    color: '#005cc5',
  },
  'hljs-addition': {
    color: '#22863a',
    background: '#f0fff4',
  },
  'hljs-deletion': {
    color: '#b31d28',
    background: '#ffeef0',
  },
  'hljs-link': {
    color: '#032f62',
    textDecoration: 'underline',
  },
}

/**
 * Темная тема в стиле GitHub Dark
 */
export const githubDarkStyle: { [key: string]: CSSProperties } = {
  hljs: {
    display: 'block',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    overflowX: 'auto' as any,
    padding: '1rem',
    color: '#e6edf3',
    background: '#161b22',
  },
  'hljs-comment': {
    color: '#8b949e',
    fontStyle: 'italic',
  },
  'hljs-doctag': {
    color: '#ff7b72',
  },
  'hljs-keyword': {
    color: '#ff7b72',
    fontWeight: 'bold',
  },
  'hljs-built_in': {
    color: '#ff7b72',
  },
  'hljs-type': {
    color: '#79c0ff',
  },
  'hljs-literal': {
    color: '#79c0ff',
  },
  'hljs-number': {
    color: '#79c0ff',
  },
  'hljs-string': {
    color: '#79c0ff',
  },
  'hljs-regexp': {
    color: '#79c0ff',
  },
  'hljs-template-variable': {
    color: '#79c0ff',
  },
  'hljs-variable': {
    color: '#ffa657',
  },
  'hljs-title': {
    color: '#d2a8ff',
  },
  'hljs-params': {
    color: '#e6edf3',
  },
  'hljs-meta': {
    color: '#79c0ff',
  },
  'hljs-meta-string': {
    color: '#79c0ff',
  },
  'hljs-section': {
    color: '#79c0ff',
  },
  'hljs-selector-tag': {
    color: '#ff7b72',
  },
  'hljs-selector-id': {
    color: '#79c0ff',
  },
  'hljs-selector-class': {
    color: '#d2a8ff',
  },
  'hljs-attr': {
    color: '#79c0ff',
  },
  'hljs-attribute': {
    color: '#79c0ff',
  },
  'hljs-symbol': {
    color: '#79c0ff',
  },
  'hljs-bullet': {
    color: '#79c0ff',
  },
  'hljs-addition': {
    color: '#7ee787',
    background: '#0c2d1b',
  },
  'hljs-deletion': {
    color: '#ffdcd7',
    background: '#490202',
  },
  'hljs-link': {
    color: '#79c0ff',
    textDecoration: 'underline',
  },
}
