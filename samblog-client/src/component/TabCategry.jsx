/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import RecentPosts from './RecentPosts';


const TabCategry = ({blogs}) => {
    return (
        
            <Tabs>
    
                <div className='container px-6 py-10 mx-auto'>

       



                <section className="justify-cente py-8 px-4 bg-gray-100 text-gray-800">
      <h2 className="text-center text-3xl font-bold mb-4">Recent Blogs</h2>
      <p className="text-lg leading-relaxed">
        Stay updated with our latest insights, stories, and trends! Dive into our recent posts where we share knowledge, tips, and the latest news in our field. Whether you`re looking for in-depth analysis, quick tips, or just some inspiration, our blog has something for everyone. Check out our newest articles below and join the conversation!
      </p>
    </section>
    <div className='flex items-center justify-center'>
    <TabList>
      <Tab>Tecnology</Tab>
      <Tab>Travel</Tab>
      <Tab>Food</Tab>
      <Tab>Health </Tab>
      <Tab>Career</Tab>
      <Tab>Lifestyle</Tab>
    </TabList>
    </div>
    <TabPanel>
    <div className='grid grid-cols-1 '>
    {
        blogs
        .filter(b=>b.category ==='Technology')
        .map(blog=>(
            <RecentPosts key={blog._id} blog={blog}/>
        ))
    }
    </div>
    </TabPanel>
    <TabPanel>
    <div className='grid grid-cols-1 '>
    {
        blogs
        .filter(b=>b.category === 'Travel')
        .map(blog=>(
            <RecentPosts key={blog._id} blog={blog}/>
        ))
    }
    </div>
    </TabPanel>
    <TabPanel>
    <div className='grid grid-cols-1 '>
    {
        blogs
        .filter(b=>b.category === 'Food')
        .map(blog=>(
            <RecentPosts key={blog._id} blog={blog}/>
        ))
    }
    </div>
    </TabPanel>
    <TabPanel>
    <div className='grid grid-cols-1 '>
    {
        blogs
        .filter(b=>b.category === 'Health')
        .map(blog=>(
            <RecentPosts key={blog._id} blog={blog}/>
        ))
    }
    </div>
    </TabPanel>
    <TabPanel>
    <div className='grid grid-cols-1 '>
    {
        blogs
        .filter(b=>b.category === 'Career')
        .map(blog=>(
            <RecentPosts key={blog._id} blog={blog}/>
        ))
    }
    </div>
    </TabPanel>
    <TabPanel>
    {
        blogs.length > 1 ?
        <div className='grid grid-cols-1 '>
    {
        blogs
        .filter(b=>b.category === 'Lifestyle')
        .map(blog=>(
            <RecentPosts key={blog._id} blog={blog}/>
        ))
    }
    </div>  : <h1 className='text-red-400'>Nothing Added</h1>
    }
    </TabPanel>
  
    </div>
  </Tabs>
        
    );
};

export default TabCategry;