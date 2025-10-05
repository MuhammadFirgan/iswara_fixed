import { Document, Page, Text, View } from '@react-pdf/renderer';
export function PdfViewerModal() {
  

  return (
    <Document
        author="firgan"
        title="coba"
    >
        <Page size="A4">
            <View>
                <Text>Coba</Text>
            </View>
        </Page>

    </Document>
  )
}