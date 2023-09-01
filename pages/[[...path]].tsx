import { existsSync, promises as fs } from 'fs';
import path from 'path';
import parse from '../lib/markdown';

import DataRichDocument from '../components/DataRichDocument';
import clientPromise from '../lib/mddb';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const DocumentContent = styled.main`
  color: #2C3E50;
  line-height: 1.6;
`;

const Header = styled.header`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-top: 0;
  margin-bottom: 15px;
  color: #34495E;
  text-align: center;
`;

const Table = styled.table`
  width: 50%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const TableHeader = styled.th`
  background-color: #34495E;
  color: #fff;
  padding: 8px 12px;
  text-align: left;
`;

const TableData = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
`;

const Link = styled.a`
  color: #007BFF;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const getStaticPaths = async () => {
  const contentDir = path.join(process.cwd(), '/content/');
  const contentFolders = await fs.readdir(contentDir, 'utf8');
  const paths = contentFolders.map((folder: string) =>
    folder === 'index.md'
      ? { params: { path: [] } }
      : { params: { path: [folder] } }
  );
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let pathToFile = 'index.md';
  if (context.params.path) {
    pathToFile = context.params.path.join('/') + '/index.md';
  }

  let datasets = [];
  const mddbFileExists = existsSync('markdown.db');
  if (mddbFileExists) {
    const mddb = await clientPromise;
    const datasetsFiles = await mddb.getFiles({
      extensions: ['md', 'mdx'],
    });
    datasets = datasetsFiles
      .filter((dataset) => dataset.url_path !== '/')
      .map((dataset) => ({
        _id: dataset._id,
        url_path: dataset.url_path,
        file_path: dataset.file_path,
        metadata: dataset.metadata,
      }));
  }

  const indexFile = path.join(process.cwd(), '/content/' + pathToFile);
  const readme = await fs.readFile(indexFile, 'utf8');

  let { mdxSource, frontMatter } = await parse(readme, '.mdx', { datasets });

  return {
    props: {
      mdxSource,
      frontMatter: JSON.stringify(frontMatter),
    },
  };
};

export default function DatasetPage({ mdxSource, frontMatter }) {
  frontMatter = JSON.parse(frontMatter);

  return (
    <Container>
      <DocumentContent>
        <DataRichDocument source={mdxSource} />
      </DocumentContent>

      <Header>
        {frontMatter.files && (
          <section>
            <SectionTitle>Data files</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <TableHeader>File</TableHeader>
                  <TableHeader>Format</TableHeader>
                </tr>
              </thead>
              <tbody>
                {frontMatter.files.map((f) => {
                  const fileName = f.split('/').slice(-1);
                  return (
                    <tr key={`resources-list-${f}`}>
                      <TableData>
                        <Link target="_blank" href={f}>
                          {fileName}
                        </Link>
                      </TableData>
                      <TableData>
                        {fileName[0].split('.').slice(-1)[0].toUpperCase()}
                      </TableData>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        )}
      </Header>
    </Container>
  );
}
