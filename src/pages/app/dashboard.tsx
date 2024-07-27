// ** MUI Imports
import { ReactNode, useCallback, useEffect, useState } from 'react';
import FrontLayout from 'src/@core/layouts/FrontLayout';
import InnerCoursePage from 'src/views/InnerCoursePage';
import SubInnerCoursePage from 'src/views/SubInnerCoursePage';
import { useRouter } from 'next/router';
import Spinner from 'src/@core/components/spinner';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Link from 'next/link';

// Define types for pagedata
interface PageData {
  Published_colleges?: number;
  Total_colleges?: number;
  Published_universities?: number;
  Total_universitys?: number;
  Published_school?: number;
  school?: number;
  stream?: number;
  generalcourse?: number;
  Published_courses?: number;
  courses?: number;
  abroadpages?: number;
  Published_exam?: number;
  exam?: number;
  enquiry?: number;
  Published_blog?: number;
  blog?: number;
  schoolboards?: number;
  Published_scholarships?: number;
  scholarships?: number;
  jobs_positions?: number;
  Total_news?: number;
  Published_news?: number;
  Total_landingpage?: number;
  Published_landingpage?: number;
  Users?: number;
}

// CardItem component for reusable card elements
const CardItem = ({ href, title, value }: { href: string; title: string; value: ReactNode }) => (
  <Grid item xs={12} sm={4} md={2} >
    <Card>
      <Link href={href}>
        <CardHeader title={title} />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {value}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  </Grid>
);

const Home = () => {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<PageData | null>(null);
  const [enquirydata, setEnquirydata] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/dashboard/get');
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch page data:', error);
      setLoading(false); // Update loading state in case of an error
    }
  }, [isMountedRef]);


  const getEnquirydata = useCallback(async () => {
    try {
      const response = await axios.get('api/admin/findenquiry/get');
      if (isMountedRef.current) {
        const { totalDataCount } = response.data;
        // Set the totalDataCount to your state
        setEnquirydata(totalDataCount);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch enquiry data:', error);
      setLoading(false); // Update loading state in case of an error
    }
  }, [isMountedRef]);


  useEffect(() => {
    getPagedata();
    getEnquirydata();
  }, [getPagedata]);

  if (loading) {
    return <Spinner />;
  }

  if (!pagedata) {
    return <Typography variant="body1" color="textSecondary">Failed to load data</Typography>;
  }

  console.log(enquirydata, "enquirydata"
  )
  return (
    <>

    {/* <Card>
      <CardHeader title="Welcome Learntech Admin!"/> */}
    <Grid container spacing={3}>
      <CardItem
        href="/app/dashboard/enquiry/" // Adjust the href as needed
        title="Today Enquiry" // Adjust the title if necessary
        value={`${enquirydata}/${enquirydata}`} // Display the totalDataCount twice
      />

      <CardItem
        href="/app/dashboard/college/"
        title="Colleges"
        value={`${pagedata.Published_colleges}/${pagedata.Total_colleges}`}
      />
      <CardItem
        href="/app/dashboard/college/"
        title="Universities"
        value={`${pagedata.Published_universities}/${pagedata.Total_universitys}`}
      />
      <CardItem
        href="/app/dashboard/schools/"
        title="Schools"
        value={`${pagedata.Published_school}/${pagedata.school}`}
      />
      <CardItem
        href="/app/dashboard/stream/"
        title="Streams"
        value={pagedata.stream}
      />
      <CardItem
        href="/app/dashboard/generalcourse/"
        title="General Courses"
        value={pagedata.generalcourse}
      />
      <CardItem
        href="/app/dashboard/course/"
        title="College Courses"
        value={`${pagedata.Published_courses}/${pagedata.courses}`}
      />
      <CardItem
        href="/app/dashboard/abroadpage/"
        title="Abroad Pages"
        value={pagedata.abroadpages}
      />
      <CardItem
        href="/app/dashboard/exam/"
        title="Exams"
        value={`${pagedata.Published_exam}/${pagedata.exam}`}
      />
      <CardItem
        href="/app/dashboard/enquiry/"
        title="Enquires"
        value={pagedata.enquiry}
      />
      <CardItem
        href="/app/dashboard/blog/"
        title="Blogs"
        value={`${pagedata.Published_blog}/${pagedata.blog}`}
      />
      <CardItem
        href="/app/dashboard/schoolboard/"
        title="Boards"
        value={pagedata.schoolboards}
      />
      <CardItem
        href="/app/dashboard/scholarships/"
        title="Scholarships"
        value={`${pagedata.Published_scholarships}/${pagedata.scholarships}`}
      />
      <CardItem
        href="/app/dashboard/jobs_positions/"
        title="Jobs Positions"
        value={pagedata.jobs_positions}
      />
      <CardItem
        href="/app/dashboard/newsevents/"
        title="News"
        value={`${pagedata.Published_news}/${pagedata.Total_news}`}
      />
      <CardItem
        href="/app/dashboard/landingpage/"
        title="Landing Pages"
        value={`${pagedata.Published_landingpage}/${pagedata.Total_landingpage}`}
      />
      <CardItem
        href="/app/dashboard/user/"
        title="Users"
        value={`${pagedata.Users}`}
      />
    </Grid>
    {/* </Card> */}
    </>
  );
}

export default Home;
