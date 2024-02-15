import { z } from 'zod'

// export function imgSchema2(fieldName: string) {
//   return z.object({
//     [fieldName]: z
//       .custom<FileList>()
//       .transform(file => file.length > 0 && file.item(0))
//       .refine(file => !file || (!!file && file.type?.startsWith('image')), {
//         message: 'Only images are allowed to be sent.',
//       })
//       .refine(file => !file || (!!file && file.size <= 2 * 1024 * 1024), {
//         message: 'The profile picture must be a maximum of 2MB.',
//       }),
//   })
// }
export const MAX_FILE_SIZE = 2000000
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export function imgSchema(fieldName: string) {
  return z.object({
    [fieldName]: z
      .instanceof(FileList)
      .refine(
        files => !files.length || (files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type)),
        '.jpg, .jpeg, .png and .webp files are accepted.'
      )
      .refine(
        files => !files.length || (files[0] && files[0].size <= MAX_FILE_SIZE),
        `Max file size is 2MB.`
      ),
  })
}
