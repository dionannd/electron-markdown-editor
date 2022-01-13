import React from 'react'
import './preview.css'
import { unified } from 'unified'
import remarkParse from 'remark-parse/lib'
import remarkReact from 'remark-react/lib'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import { defaultSchema } from 'hast-util-sanitize'
import RemarkCode from './remark-code'

interface Props {
  doc: string
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className']
  }
}

const Preview: React.FC<Props> = props => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode
      }
    })
    .processSync(props.doc).result

  return <div className="preview markdown-body">{md}</div>
}

export default Preview
