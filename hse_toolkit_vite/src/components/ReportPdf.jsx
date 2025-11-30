import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, fontFamily: 'Helvetica' },
  header: { fontSize: 14, marginBottom: 8, fontWeight: 'bold' },
  sub: { fontSize: 10, marginBottom: 6, color: '#444' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 6 },
  cellKey: { width: '50%', paddingRight: 8 },
  cellVal: { width: '50%' },
  footer: { position: 'absolute', bottom: 24, left: 24, right: 24, textAlign: 'center', fontSize: 9, color: '#666' }
})

export function ReportDocument({ meta, metrics, chartDataUrl }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{meta?.projectName || 'Project'} — HSE Report</Text>
        <Text style={styles.sub}>Period: {meta?.period || '-' } · Generated: {new Date().toLocaleString()}</Text>

        <View style={{ marginTop: 6 }}>
          {Object.entries(metrics || {}).map(([k,v])=>(
            <View style={styles.tableRow} key={k}>
              <Text style={styles.cellKey}>{k}</Text>
              <Text style={styles.cellVal}>{String(v)}</Text>
            </View>
          ))}
        </View>

        {chartDataUrl && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ marginBottom: 6, fontSize: 11 }}>Chart</Text>
            <Image src={chartDataUrl} style={{ width: '100%', height: 140 }} />
          </View>
        )}

        <Text style={styles.footer}>Methodology: OSHA 1904 · ISO 45001 · ILO OSH · Created by Amjathkhan</Text>
      </Page>
    </Document>
  )
}

export default function ReportPdfDownload({ meta, metrics, chartDataUrl }) {
  const filename = `${(meta && meta.projectName) ? meta.projectName.replace(/\s+/g,'_') : 'project'}_HSE_Report.pdf`
  return (
    <PDFDownloadLink document={<ReportDocument meta={meta} metrics={metrics} chartDataUrl={chartDataUrl} />} fileName={filename}>
      {({ blob, url, loading, error }) => (loading ? 'Preparing PDF...' : <button className="bg-indigo-600 text-white px-3 py-1 rounded">Download PDF</button>)}
    </PDFDownloadLink>
  )
}
