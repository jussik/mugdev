using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Relational.Migrations.Infrastructure;
using MugDev.Models;
using System;

namespace MugDev.Migrations
{
    [ContextType(typeof(MugDev.Models.MugsAppContext))]
    public class MugsAppContextModelSnapshot : ModelSnapshot
    {
        public override IModel Model
        {
            get
            {
                var builder = new BasicModelBuilder();
                
                builder.Entity("MugDev.Models.Mug", b =>
                    {
                        b.Property<string>("Description");
                        b.Property<float>("Height");
                        b.Property<int>("Id")
                            .GenerateValueOnAdd();
                        b.Property<float>("Radius");
                        b.Property<int>("Shape");
                        b.Property<string>("Title");
                        b.Key("Id");
                    });
                
                return builder.Model;
            }
        }
    }
}