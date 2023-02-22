import en from './locales/en.json'
import * as icons from '@icon-park/svg'
import type { BytemdPlugin, BytemdEditorContext } from 'bytemd'
import selectFiles from 'select-files'

type Locale = {
  file: string
  fileTitle: string
}

export interface BytemdPluginFileOptions {
  locale?: Partial<Locale>
  uploadFile?: (file: File) => Promise<string | undefined>
  accept?: string
}

export default function fileUpload({
  locale: _locale = {},
  uploadFile,
  accept = 'application/zip',
}: BytemdPluginFileOptions = {}): BytemdPlugin {
  const locale = { ...en, ..._locale } as Locale

  return {
    actions: [
      {
        title: locale.file,
        icon: icons.FileZip({}),
        cheatsheet: `![${locale.file}](${locale.fileTitle})`,
        handler: uploadFile
          ? {
              type: 'action',
              async click(ctx: BytemdEditorContext) {
                const files = await selectFiles({
                  // .rpm, .deb, .zip, .gz, .pdf
                  accept,
                  multiple: false,
                })
                if (files?.length) {
                  await handleFileUpload(ctx, uploadFile, files[0])
                }
              },
            }
          : undefined,
      },
    ],
  }
}

export async function handleFileUpload(
  { editor, appendBlock, codemirror }: BytemdEditorContext,
  uploadFile: NonNullable<BytemdPluginFileOptions['uploadFile']>,
  file: File
) {
  const res = await uploadFile(file)
  const pos = appendBlock(`[${file.name}](${res})`)
  editor.setSelection(pos, codemirror.Pos(pos.line + 1, 0))
  editor.focus()
}
