import Head from 'next/head'
import Image from 'next/image'
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import styles from '../../styles/Home.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Button from '@mui/material/Button';


import useStoreAuth from '../../store'


import * as React from 'react';
// import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

const Table = dynamic(() => import("@mui/material/Table"), {
  ssr: false,
});

function createData(
  name: string,
  address: string,
  symbol: string,
  average: number,
  ceiling: number,
  floor: number,
  totalSales: number,
  volume: number
) {
  return { name, address, symbol, average, ceiling, floor, totalSales, volume };
}

export function BasicTable(data: any) {
  let rows: Array<any> = [];
  // console.log("in table", data.data)
  for (var val of data.data) {
    rows.push(createData(val.node.name, 
      val.node.address,
      val.node.symbol, 
      val.node.stats.average, 
      val.node.stats.ceiling, 
      val.node.stats.floor, 
      val.node.stats.totalSales, 
      val.node.stats.volume))
  }  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Average</TableCell>
            <TableCell align="right">Ceiling</TableCell>
            <TableCell align="right">Floor</TableCell>
            <TableCell align="right">Total Sales</TableCell>
            <TableCell align="right">Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.address}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{row.average}</TableCell>
              <TableCell align="right">{row.ceiling}</TableCell>
              <TableCell align="right">{row.floor}</TableCell>
              <TableCell align="right">{row.totalSales}</TableCell>
              <TableCell align="right">{row.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query TrendingCollections {
          trendingCollections(orderBy: SALES, orderDirection: DESC) {
              edges {
              node {
                  address
                  ... on ERC721Contract {
                  name
                  stats {
                      totalSales
                      average
                      ceiling
                      floor
                      volume
                  }
                  symbol
                  }
              }
              }
          }
          }
    `,
  });

  return {
    props: {
      data: data,
    },
 };
}

export default function TrendingCollections({data} : {data:any}) {
  const signOut = useStoreAuth((state) => state.signOut)
  return (
    <div className={styles.container}>
    <Link href="/"><Button className={styles.signOutBtn} onClick={signOut}>Sign Out</Button></Link>
    <Head>
        <title>Trending Collections</title>
        <meta name="view-trending-collections" content="trending collections" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
        <h1 className={styles.title}>
        Trending NFT Collections
        </h1>

        <BasicTable className={styles.tableData} data={data.trendingCollections.edges}></BasicTable>

    </main>

    <footer className={styles.footer}>
        <a
        href="https://www.quicknode.com/"
        target="_blank"
        rel="noopener noreferrer"
        >
        Powered by {'QuickNode'}
        </a>
    </footer>
    </div>
  )
}
  